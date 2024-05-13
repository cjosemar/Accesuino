import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmpleadosComponent} from './empleados.component';
import {EmpleadosAdminComponent} from './empleados-admin/empleados-admin.component';
import {PuestosAdminComponent} from './puestos-admin/puestos-admin.component';
import {HorariosAdminComponent} from './horarios-admin/horarios-admin.component';
import {NotFoundComponent} from '../not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    component: EmpleadosComponent,
    children: [
      {
        path: 'empleados',
        component: EmpleadosAdminComponent
      },
      {
        path: 'puestos',
        component: PuestosAdminComponent
      },
      {
        path: 'horarios',
        component: HorariosAdminComponent
      },
      {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
