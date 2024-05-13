import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Empleado} from '../model';

/**
 * Gestion Empleados en backend
 */
@Injectable({
  providedIn: 'root'
})
export class EmpleadosDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve empleados paginados
   * @param page
   */
  getEmpleados(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.empleados, page)).toPromise();
  }

  /**
   * Crea empleado con datos introducidos
   * @param empleado
   */
  createEmpleados(empleado: Empleado) {
    return this.http.post(this.api.setApiService(ServicesString.empleados), empleado).toPromise();
  }

  /**
   * Actualiza empleado
   * @param empleado
   */
  updateEmpleados(empleado: Empleado) {
    return this.http.put(this.api.setApiServiceById(ServicesString.empleados, empleado.id), empleado).toPromise();
  }

  /**
   * Borra empleado
   * @param empleado
   */
  deleteEmpleados(empleado: Empleado) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.empleados, empleado.id)).toPromise();
  }
}
