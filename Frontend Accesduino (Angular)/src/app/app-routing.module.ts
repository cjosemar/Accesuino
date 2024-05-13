import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {AuthGuard, StartGuard} from './@core/guard';
import {AyudaGestionComponent} from './pages/ayuda-gestion/ayuda-gestion.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full',
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ayudaGestion',
    component: AyudaGestionComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
