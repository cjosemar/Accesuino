import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {TipoPermiso} from '../model/tipo-permiso.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona los tipos de permisos en backend
 */
export class TiposPermisoDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve lista de tipos de permisos paginados
   * @param page
   */
  getTiposPermiso(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.tipospermisotrabajo, page)).toPromise();
  }

  /**
   * Creat tipos de permisos
   * @param tipoPermiso
   */
  createTiposPermiso(tipoPermiso: TipoPermiso) {
    return this.http.post(this.api.setApiService(ServicesString.tipospermisotrabajo), tipoPermiso).toPromise();
  }

  /**
   * Actualiza un tipo de permiso
   * @param tipoPermiso
   */
  updateTipoPermiso(tipoPermiso: TipoPermiso) {
    return this.http.put(this.api.setApiServiceById(ServicesString.tipospermisotrabajo, tipoPermiso.id), tipoPermiso).toPromise();
  }

  /**
   * Borra un tipo de permiso
   * @param tipoPermiso
   */
  deleteTipoPermiso(tipoPermiso: TipoPermiso) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.tipospermisotrabajo, tipoPermiso.id)).toPromise();
  }

}
