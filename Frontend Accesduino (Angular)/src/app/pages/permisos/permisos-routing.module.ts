import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermisosComponent} from './permisos.component';
import {PermisosAdminComponent} from './permisos-admin/permisos-admin.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {TiposPermisoAdminComponent} from './tipos-permiso-admin/tipos-permiso-admin.component';


const routes: Routes = [
  {
    path: '',
    component: PermisosComponent,
    children: [
      {
        path: 'permisos',
        component: PermisosAdminComponent
      },
      {
        path: 'tipos',
        component: TiposPermisoAdminComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
