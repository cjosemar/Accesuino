import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Puesto} from '../model';


@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona Puestos de trabajo en backend
 */
export class PuestosDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve listado de puestos paginado
   * @param page
   */
  getPuestos(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.puestos, page)).toPromise();
  }

  /**
   * Crea puesto nuevos
   * @param puesto
   */
  createPuestos(puesto: Puesto) {
    return this.http.post(this.api.setApiService(ServicesString.puestos), puesto).toPromise();
  }

  /**
   * Actualiza puesto
   * @param puesto
   */
  updatePuestos(puesto: Puesto) {
    return this.http.put(this.api.setApiServiceById(ServicesString.puestos, puesto.id), puesto).toPromise();
  }

  /**
   * Borra puesto
   * @param puesto
   */
  deletePuestos(puesto: Puesto) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.puestos, puesto.id)).toPromise();
  }
}
