import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Empleado, Permiso} from '../model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona Permisos en backend
 */
export class PermisosDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve lista de permisos paginada
   * @param page
   */
  getPermisos(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.permisostrabajo, page)).toPromise();
  }

  /**
   * Crea permisos
   * @param permiso
   */
  createPermiso(permiso: Permiso) {
    return this.http.post(this.api.setApiService(ServicesString.permisostrabajo), permiso).toPromise();
  }

  /**
   * Actualiza permisos
   * @param permiso
   */
  updatePermisos(permiso: Permiso) {
    return this.http.put(this.api.setApiServiceById(ServicesString.permisostrabajo, permiso.id), permiso).toPromise();
  }

  /**
   * Borra permisos
   * @param permiso
   */
  deletePermisos(permiso: Permiso) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.permisostrabajo, permiso.id)).toPromise();
  }
}
