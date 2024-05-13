import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from './registro.component';
import {NotFoundComponent} from '../pages/not-found/not-found.component';
import {RegistroLoginComponent} from './registro-login/registro-login.component';
import {AyudaRegistroComponent} from './ayuda-registro/ayuda-registro.component';


const routes: Routes = [
  {
    path: '',
    component: RegistroComponent,
    children: [
      {
        path: 'registroLogin',
        component: RegistroLoginComponent
      },
      {
        path: 'ayuda',
        component: AyudaRegistroComponent
      },
      {
        path: '',
        redirectTo: 'registroLogin',
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
export class RegistroRoutingModule { }
