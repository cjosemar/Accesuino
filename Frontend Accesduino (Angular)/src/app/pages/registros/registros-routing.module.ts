import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrosComponent} from './registros.component';
import {RegistrosListComponent} from './registros-list/registros-list.component';
import {RegistrosModComponent} from './registros-mod/registros-mod.component';
import {NotFoundComponent} from '../not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: RegistrosComponent,
    children: [
      {
        path: 'registros',
        component: RegistrosListComponent
      },
      {
        path: '',
        redirectTo: 'registros',
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
export class RegistrosRoutingModule { }
