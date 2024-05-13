import { Component, OnInit } from '@angular/core';
import {Empleado, Horario, MetaDatosModel, Puesto} from '../../../@core/model';
import {EmpleadosDataService, HorariosDataService} from '../../../@core/datas';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-empleados-horarios',
  templateUrl: './empleados-horarios.component.html',
  styleUrls: ['./empleados-horarios.component.scss']
})
export class EmpleadosHorariosComponent implements OnInit {

  empleados: Empleado[] = [];
  meta: MetaDatosModel;
  horarios: Horario[] = [];
  metaHorarios: MetaDatosModel;

  constructor(
    private empleadoDb: EmpleadosDataService,
    private horarioDb: HorariosDataService
  ) {
    this.getEmpleados(1);
    this.getHorarios(1);

  }

  ngOnInit(): void {
  }

  private  getEmpleados(pagina: number) {
    this.empleadoDb.getEmpleados(pagina).then((res:any) => {
      this.meta = res['meta'][0];
      this.empleados = [...this.empleados, ...res[0]];
      if (this.meta.total_pages != this.meta.current_page) {
        this.getEmpleados(this.meta.current_page + 1);
      }
    });
  }

  private getHorarios(pagina: number) {
    this.horarioDb.getHorarios(pagina).then((res:any) => {
      this.metaHorarios = res['meta'][0];
      this.horarios = [...this.horarios,...res[0]];
      if (this.metaHorarios.total_pages != this.metaHorarios.current_page) {
        this.getHorarios(this.metaHorarios.current_page + 1);
      }
    })
  }

  public getEmpleadosbyHorario(horario: Horario): Empleado[] {
    return this.empleados.filter(e => e.horario.id == horario.id);
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
      pdf.save(`empleados_horarios_${new Date().toLocaleDateString('es')}.pdf`);
    });
  }

}
