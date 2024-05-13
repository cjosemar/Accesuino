import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosAdminComponent } from './empleados-admin/empleados-admin.component';
import { PuestosAdminComponent } from './puestos-admin/puestos-admin.component';
import { HorariosAdminComponent } from './horarios-admin/horarios-admin.component';
import { EditHorarioComponent } from './horarios-admin/edit-horario/edit-horario.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbUserModule
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import { EditPuestoComponent } from './puestos-admin/edit-puesto/edit-puesto.component';
import { EditEmpleadoComponent } from './empleados-admin/edit-empleado/edit-empleado.component';


@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosAdminComponent,
    PuestosAdminComponent,
    HorariosAdminComponent,
    EditHorarioComponent,
    EditPuestoComponent,
    EditEmpleadoComponent
  ],
    imports: [
        CommonModule,
        EmpleadosRoutingModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ReactiveFormsModule,
        NbInputModule,
        NbUserModule,
        NbTabsetModule,
        NbSelectModule,
        NbAlertModule
    ]
})
export class EmpleadosModule { }
