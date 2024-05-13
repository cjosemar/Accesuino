import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesPermisosRoutingModule } from './reportes-permisos-routing.module';
import { ReportesPermisosComponent } from './reportes-permisos.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PermisosMesComponent } from './permisos-mes/permisos-mes.component';
import { PermisosPersonalComponent } from './permisos-personal/permisos-personal.component';
import {NbButtonModule, NbCardModule, NbIconModule} from '@nebular/theme';


@NgModule({
  declarations: [ReportesPermisosComponent, PermisosComponent, PermisosMesComponent, PermisosPersonalComponent],
  imports: [
    CommonModule,
    ReportesPermisosRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class ReportesPermisosModule { }
