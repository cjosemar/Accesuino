import { Injectable } from '@angular/core';
import {EnvironmentService, ServicesString} from '../utils';
import {HttpClient} from '@angular/common/http';
import {RolePermiso} from '../model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestión de permisos para roles
 */
export class PermissionDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve los privilegios paginados
   * @param page
   */
  getPermission(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.permissions, page)).toPromise();
  }

  /**
   * Asigna permisos a rol.
   * @param role
   * @param permission
   */
  assignPermission(role: string, permission: string) {
    const add: RolePermiso = {rol: role, permission: permission};
    return this.http.post(this.api.setApiPermission('assign'), add).toPromise();
  }

  /**
   * Revoca permiso a rol.
   * @param role
   * @param permission
   */
  revokePermission(role: string, permission: string) {
    const revoke: RolePermiso = {rol:role, permission:permission};
    return this.http.post(this.api.setApiPermission('revoke'), revoke).toPromise();
  }
}
