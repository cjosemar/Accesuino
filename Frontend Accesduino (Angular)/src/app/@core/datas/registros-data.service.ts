import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Registro} from '../model/registro.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona Registros en backend
 */
export class RegistrosDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve lista de registros paginados
   * @param page
   */
  getRegistros(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.registros, page)).toPromise();
  }

  /**
   * Devuelve todos los  registros del sistema sin paginar
   */
  getAllRegistros() {
    return this.http.get(this.api.setApiService(ServicesString.registros) + '?limit=100000000').toPromise();
  }

  /**
   * Devuelve los registros de un empelado paginados
   * @param page
   * @param empleadoUuid
   */
  getRegistrosEmpleados(page: number, empleadoUuid: string) {
    return this.http.get(this.api.setApiServiceRegistrosEmpleado(page, empleadoUuid)).toPromise();
  }

  /**
   * Actualiza un registro
   * @param registro
   */
  updateRegistro(registro: Registro) {
    return this.http.put(this.api.setApiServiceById(ServicesString.registros, registro.id), registro).toPromise();
  }

  /**
   * Borra registro
   * @param registro
   */
  deleteRegistro(registro: Registro) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.registros, registro.id)).toPromise();
  }

  /**
   * Crea registro por medio del login y password de un empleado
   * @param login
   * @param password
   */
  registrarByLogin(login: string, password: string) {
    return this.http.get(this.api.setApiServiceRegistroByLogin(login, password)).toPromise();
  }


}
