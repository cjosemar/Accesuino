import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Horario} from '../model';

/**
 * Gestiona Horarios en backend
 */
@Injectable({
  providedIn: 'root'
})
export class HorariosDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve listado de horarios paginados
   * @param page
   */
  getHorarios(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.horarios, page)).toPromise();
  }

  /**
   * Crea horario
   * @param horario
   */
  createHorario(horario: Horario) {
    return this.http.post(this.api.setApiService(ServicesString.horarios), horario).toPromise();
  }

  /**
   * Actualiza horario
   * @param horario
   */
  updateHorario(horario: Horario) {
    return this.http.put(this.api.setApiServiceById(ServicesString.horarios, horario.id), horario).toPromise();
  }

  /**
   * Borrar horario
   * @param horario
   */
  deleteHorario(horario: Horario) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.horarios, horario.id)).toPromise();
  }


}
