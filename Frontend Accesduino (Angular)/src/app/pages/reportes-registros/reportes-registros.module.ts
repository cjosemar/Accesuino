import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRegistrosRoutingModule } from './reportes-registros-routing.module';
import { ReportesRegistrosComponent } from './reportes-registros.component';
import { RegistrosComponent } from './registros/registros.component';
import { RegistrosEmpleadoComponent } from './registros-empleado/registros-empleado.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbSelectModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ReportesRegistrosComponent, RegistrosComponent, RegistrosEmpleadoComponent],
  imports: [
    CommonModule,
    ReportesRegistrosRoutingModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class ReportesRegistrosModule { }
