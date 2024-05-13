import { Component, OnInit } from '@angular/core';
import {Empleado, MetaDatosModel, Puesto} from '../../../@core/model';
import {EmpleadosDataService, PuestosDataService} from '../../../@core/datas';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-empleados-puestos',
  templateUrl: './empleados-puestos.component.html',
  styleUrls: ['./empleados-puestos.component.scss']
})
export class EmpleadosPuestosComponent implements OnInit {

  empleados: Empleado[] = [];
  meta: MetaDatosModel;
  puestos: Puesto[] = [];
  metaPuestos: MetaDatosModel;

  constructor(
    private empleadoDb: EmpleadosDataService,
    private puestosDb: PuestosDataService,
  ) {
    this.getPuestos(1);
    this.getEmpleados(1);
  }

  ngOnInit(): void {
  }

  private getEmpleados(pagina: number) {
    this.empleadoDb.getEmpleados(pagina).then((res:any) => {
      this.meta = res['meta'][0];
      this.empleados = [...this.empleados, ...res[0]];
      if (this.meta.total_pages != this.meta.current_page) {
        this.getEmpleados(this.meta.current_page + 1);
      }
    });
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
      pdf.save(`empleados_puestos_${new Date().toLocaleDateString('es')}.pdf`);
    });
  }

  private getPuestos(pagina: number) {
    this.puestosDb.getPuestos(pagina).then((res: any) => {
      this.metaPuestos = res['meta'][0];
      this.puestos = [...this.puestos, ...res[0]] ;
      if (this.metaPuestos.total_pages != this.metaPuestos.current_page) {
        this.getPuestos(this.metaPuestos.current_page + 1);
      }
    });
  }

  public getEmpleadosbyPuesto(puesto: Puesto): Empleado[] {
    return this.empleados.filter(e => e.puesto.id == puesto.id);
  }

}
