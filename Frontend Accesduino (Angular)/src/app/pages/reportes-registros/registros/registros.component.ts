import { Component, OnInit } from '@angular/core';
import {MetaDatosModel} from '../../../@core/model';
import {Registro} from '../../../@core/model/registro.model';
import {RegistrosDataService} from '../../../@core/datas/registros-data.service';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {

  registros: Registro[] = [];
  meta: MetaDatosModel;
  meses: string[] = [];
  mesSelect: string;

  constructor(
    private registrosDb: RegistrosDataService
  ) {
    moment.locale('es');
    this.meses = moment.months();
    this.mesSelect = this.meses[moment().month()];
    this.getRegistros();
  }

  ngOnInit(): void {
  }

  private getRegistros() {
    this.registrosDb.getAllRegistros().then((res:any) => {
      this.meta = res['meta'][0];
      this.registros = res[0];
    });
  }

  getRegistrosbyMes(mes: number) {

    return this.registros.filter(r => moment(r.inicio).get('month') == mes);
  }



  generarPdf() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas.default(DATA, { allowTaint: true }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      pdf.save(`registros_${new Date().toLocaleDateString('es')}.pdf`);
    });
  }

}
