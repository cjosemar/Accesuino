import { Component, OnInit } from '@angular/core';
import {MetaDatosModel, Permiso} from '../../../@core/model';
import {PermisosDataService} from '../../../@core/datas';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as moment from 'moment';

@Component({
  selector: 'app-permisos-mes',
  templateUrl: './permisos-mes.component.html',
  styleUrls: ['./permisos-mes.component.scss']
})
export class PermisosMesComponent implements OnInit {



  permisos: Permiso[] = [];
  meta: MetaDatosModel;
  meses: string[] = [];

  constructor(
    private permisosDb: PermisosDataService
  ) {
    moment.locale('es');
    this.meses = moment.months();
    this.getPermisos(1);

  }

  ngOnInit(): void {
  }

  private getPermisos(pagina: number) {
    this.permisosDb.getPermisos(pagina).then((res:any) => {
      this.meta = res['meta'][0];
      this.permisos = [...this.permisos, ...res[0]];
      if (this.meta.total_pages != this.meta.current_page) {
        this.getPermisos(this.meta.current_page + 1);
      }
    });
  }

  getPermisosbyMes(mes: number) {
    return this.permisos.filter(p => moment(p.inicio).get('month') ==  mes);
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
      pdf.save(`permisos_mes_${new Date().toLocaleDateString('es')}.pdf`);
    });
  }

}
