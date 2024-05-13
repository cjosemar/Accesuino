import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportesRegistrosComponent} from './reportes-registros.component';
import {RegistrosComponent} from './registros/registros.component';
import {RegistrosEmpleadoComponent} from './registros-empleado/registros-empleado.component';
import {NotFoundComponent} from '../not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: ReportesRegistrosComponent,
    children: [
      {
        path: 'registros',
        component: RegistrosComponent
      },
      {
        path: 'registrosEmpleado',
        component: RegistrosEmpleadoComponent
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
export class ReportesRegistrosRoutingModule { }
