import {Injectable} from '@angular/core';
import {EnvironmentService, ServicesString} from '../utils';
import {HttpClient} from '@angular/common/http';
import {PermissionDataService} from './permission-data.service';
import {Role} from '../model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona roles en backend
 */
export class RolesDataService {

  constructor(
    private http: HttpClient,
    private permissionDb: PermissionDataService,
    private api:EnvironmentService
  ) { }

  /**
   * Devuelve los roles paginados
   * @param page
   */
  getRoles(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.roles, page)).toPromise();
  }

  /**
   * Devuelve todos los roles
   */
  getAllRoles() {
    return this.http.get(this.api.setApiService(ServicesString.roles)).toPromise();
  }

  /**
   * Crea un rol nuevo
   * @param rol
   * @param permisos
   */
  createRole(rol: Role, permisos: {permiso: string, accion: number}[]) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api.setApiService(ServicesString.roles), {name:rol.name}).toPromise().then(() => {
        if (permisos.length > 0) {
          permisos.forEach((p, index) => {
            if (p.accion > 0) {
              this.permissionDb.assignPermission(rol.name, p.permiso).then(() => {
                if (index + 1 == permisos.length) {
                  resolve()
                }
              }).catch(error => {
                console.log(error);
                reject(error);
              });
            }
            if (p.accion < 0) {
              this.permissionDb.revokePermission(rol.name, p.permiso).then((() => {
                if (index + 1 == permisos.length) {
                  resolve()
                }
              })).catch(error => {
                console.log(error);
                reject(error);
              });
            }
            if (p.accion === 0) {
              if (index + 1 == permisos.length) {
                resolve()
              }
            }
          })
        } else {
          resolve()
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Actualiza un rol
   * @param rol
   * @param permisos
   */
  updateRole(rol: Role, permisos: {permiso: string, accion: number}[]) {
    return new Promise((resolve, reject) => {
      this.http.put(this.api.setApiServiceById(ServicesString.roles, rol.id), {name:rol.name}).toPromise().then(() => {
        if (permisos.filter(p => p.accion > 0 || p.accion < 0).length > 0) {
          permisos.forEach((p, index) => {
            if (p.accion > 0) {
              this.permissionDb.assignPermission(rol.name, p.permiso).then(() => {
                if (index + 1 == permisos.length) {
                  resolve()
                }
              }).catch(error => {
                console.log(error);
                reject(error);
              });
            }
            if (p.accion < 0) {
              this.permissionDb.revokePermission(rol.name, p.permiso).then((() => {
                if (index + 1 == permisos.length) {
                  resolve()
                }
              })).catch(error => {
                console.log(error);
                reject(error);
              });
            }
            if (p.accion === 0) {
              if (index + 1 == permisos.length) {
                resolve()
              }
            }
          })
        } else {
          resolve()
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Borra un role
   * @param role
   */
  deleteRole(role: Role) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.roles, role.id)).toPromise();
  }


}
