import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportesPermisosComponent} from './reportes-permisos.component';
import {PermisosComponent} from './permisos/permisos.component';
import {PermisosMesComponent} from './permisos-mes/permisos-mes.component';
import {PermisosPersonalComponent} from './permisos-personal/permisos-personal.component';
import {NotFoundComponent} from '../not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: ReportesPermisosComponent,
    children: [
      {
        path: 'permisos',
        component: PermisosComponent
      },
      {
        path: 'permisosMes',
        component: PermisosMesComponent
      },
      {
        path: 'permisosPersonal',
        component: PermisosPersonalComponent
      },
      {
        path: '',
        redirectTo: 'permisos',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesPermisosRoutingModule { }
