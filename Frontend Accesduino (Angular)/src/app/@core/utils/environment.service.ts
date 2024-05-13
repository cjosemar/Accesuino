import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {ServicesString} from './services-string.enum';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  url: string = environment.url;
  // url: 'http://192.168.1.200/',

  constructor(
    private http: HttpClient
  ) { }

  setApiService(service: ServicesString) {
    return this.url + 'api/' + service;
  }
  setApiServicePage(service: ServicesString, page: number) {
    return this.url + 'api/' + service + '?page=' + page;
  }

  setApiServiceById(service: ServicesString, id: string) {
    return this.url + 'api/' + service +'/' + id;
  }

  setApiServiceRegistrosEmpleado(page: number, empleadoUuid: string) {
    return this.url + 'api/' + ServicesString.registros + '?' + 'page=' + page + '&empleado_uuid=' + empleadoUuid;
  }

  setApiServiceRegistroByLogin(login: string, password: string) {
    return this.url + 'api/registro/login?email=' + login + '&&password=' + password;

  }

  setApiAssets(uuid: string, render: boolean = false) {
    return this.url + 'api/assets' + '/' + uuid + (render ? '/render' : '');
  }

  setApiPermission(accion: 'assign' | 'revoke' | 'view', uuid?: string) {
    return this.url + 'api/permissions/' + (accion == 'view' ? uuid : accion)
  }

  setAuthService(service: ServicesString) {
    return this.url + 'oauth/' + service
  }

  setAuthServiceById(service: ServicesString, id: string) {
    return this.url + 'oauth/' + service + '/' + id;
  }


  setLoginJson(loginData: FormData) {
    loginData.append('client_secret', environment.secretClient);
    loginData.append('grant_type', environment.grantType);
    loginData.append('client_id', environment.client);
    return loginData;
  }

}
