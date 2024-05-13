import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Asset} from '../model/asset.model';
import {map} from 'rxjs/operators';

/**
 * Clases que gestiona assets con Backend
 */
@Injectable({
  providedIn: 'root'
})
export class AssetsDataService {

  //Imagen por defecto cuando no existe ninguna
  private static readonly UUIDNOTIMG = '577b9518-fc37-4d61-91b4-77ad9b635097';

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Sube imagen al servidor
   * @param file
   */
  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post(this.api.setApiService(ServicesString.assets), formData,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};
          case HttpEventType.Response:
            return event.body;
          default:
            return `Evento desconocido: ${event.type}`;
        }
    }))
  }

  /**
   * Recoge imagen del servidor a traves desu uuid
   * @param uuid
   * @param render
   */
  getFile(uuid: string, render: boolean = false) {
    return this.http.get(this.api.setApiAssets(uuid, render)).toPromise();
  }

  /**
   * Devuelve imagen por defecto
   */
  getNotImag () {
    return this.api.setApiAssets(AssetsDataService.UUIDNOTIMG, true);
  }

  /**
   * Devuelve uid de imagen por defecto
   */
  getUIDNotImage() {
    return AssetsDataService.UUIDNOTIMG;
  }

}
