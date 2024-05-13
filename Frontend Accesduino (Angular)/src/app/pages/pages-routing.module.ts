import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PagesComponent} from './pages.component';
import {DatosEmpresaComponent} from './datos-empresa/datos-empresa.component';
import {AyudaGestionComponent} from './ayuda-gestion/ayuda-gestion.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)
      },
      {
        path: 'permisos',
        loadChildren: () => import('./permisos/permisos.module').then(m => m.PermisosModule)
      },
      {
        path: 'registros',
        loadChildren: () => import('./registros/registros.module').then(m => m.RegistrosModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'reportesEmpleados',
        loadChildren: () => import('./reportes-empleados/reportes-empleados.module').then(m => m.ReportesEmpleadosModule)
      },
      {
        path: 'reportesPermisos',
        loadChildren: () => import('./reportes-permisos/reportes-permisos.module').then(m => m.ReportesPermisosModule)
      },
      {
        path: 'reportesRegistros',
        loadChildren: () => import('./reportes-registros/reportes-registros.module').then(m => m.ReportesRegistrosModule)
      },
      {
        path: 'datos',
        component: DatosEmpresaComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
export class PagesRoutingModule { }
