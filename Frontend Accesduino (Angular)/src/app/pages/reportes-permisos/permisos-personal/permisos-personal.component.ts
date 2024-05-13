import { Component, OnInit } from '@angular/core';
import {Empleado, MetaDatosModel, Permiso} from '../../../@core/model';
import {EmpleadosDataService, PermisosDataService} from '../../../@core/datas';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-permisos-personal',
  templateUrl: './permisos-personal.component.html',
  styleUrls: ['./permisos-personal.component.scss']
})
export class PermisosPersonalComponent implements OnInit {

  permisos: Permiso[] = [];
  meta: MetaDatosModel;
  empleados: Empleado[] = [];
  metaEmpleados: MetaDatosModel;

  constructor(
    private permisosDb: PermisosDataService,
    private empleadoDb: EmpleadosDataService
  ) {
    this.getEmpleados(1);
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

  private getEmpleados(pagina: number) {
    this.empleadoDb.getEmpleados(pagina).then((res:any) => {
      this.meta = res['meta'][0];
      this.empleados = [...this.empleados, ...res[0]];
      if (this.meta.total_pages != this.meta.current_page) {
        this.getEmpleados(this.meta.current_page + 1);
      }
    });
  }

  getPermisosbyEmpleado(empleado: Empleado): Permiso[] {
    return this.permisos.filter(p => p.empleado.id == empleado.id);
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
      pdf.save(`permisos_empleados_${new Date().toLocaleDateString('es')}.pdf`);
    });
  }

}
