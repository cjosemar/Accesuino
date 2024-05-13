import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmpleadosComponent} from './empleados/empleados.component';
import {EmpleadosPuestosComponent} from './empleados-puestos/empleados-puestos.component';
import {ReportesEmpleadosComponent} from './reportes-empleados.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {EmpleadosHorariosComponent} from './empleados-horarios/empleados-horarios.component';


const routes: Routes = [
  {
    path: '',
    component: ReportesEmpleadosComponent,
    children: [
      {
        path: 'empleados',
        component: EmpleadosComponent
      },
      {
        path: 'empleadosPuestos',
        component: EmpleadosPuestosComponent
      },
      {
        path: 'empeladosHorarios',
        component: EmpleadosHorariosComponent
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
export class ReportesEmpleadosRoutingModule { }
