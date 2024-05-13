import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import {UserAdminComponent} from './user-admin/user-admin.component';
import {RolesAdminComponent} from './roles-admin/roles-admin.component';
import {PermissionsAdminComponent} from './permissions-admin/permissions-admin.component';
import {NotFoundComponent} from '../not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'users',
        component: UserAdminComponent
      },
      {
        path: 'roles',
        component: RolesAdminComponent
      },
      {
        path: 'permissions',
        component: PermissionsAdminComponent
      },
      {
        path: '',
        redirectTo: 'users',
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
export class UsersRoutingModule { }
