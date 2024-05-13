import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesEmpleadosRoutingModule } from './reportes-empleados-routing.module';
import { ReportesEmpleadosComponent } from './reportes-empleados.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import {NbButtonModule, NbCardModule, NbIconModule} from '@nebular/theme';
import { EmpleadosPuestosComponent } from './empleados-puestos/empleados-puestos.component';
import { EmpleadosHorariosComponent } from './empleados-horarios/empleados-horarios.component';


@NgModule({
  declarations: [ReportesEmpleadosComponent, EmpleadosComponent, EmpleadosPuestosComponent, EmpleadosHorariosComponent],
  imports: [
    CommonModule,
    ReportesEmpleadosRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class ReportesEmpleadosModule { }
