import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {DatosEmpresa} from '../model/datos-empresa.model';

/**
 * Gestiona datos de la emperesa en backend
 */
@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaDataService {

  // UUID del registr de Datos de empresa
  private static readonly UUID_DATOS = '6eda4847-591f-485b-bf9c-58d3b7b50a93';

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) {}

  /**
   * devuelve datos de empresa registrados
   */
  getDatosEmpresa(): Promise<DatosEmpresa> {
    return this.http.get(this.api.setApiServiceById(ServicesString.datos, DatosEmpresaDataService.UUID_DATOS))
      .toPromise().then((datos: DatosEmpresa) => {
        datos.asset_uuid = datos.asset.id;
        console.log(datos);
        return datos;
    });
  }

  /**
   * Actualiza datos de empresa
   * @param datosEmpresa
   */
  updateDatosEmpresa(datosEmpresa: DatosEmpresa) {
    return this.http.patch(this.api.setApiServiceById(ServicesString.datos, DatosEmpresaDataService.UUID_DATOS),
      datosEmpresa).toPromise();
  }

}
