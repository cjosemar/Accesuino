import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/operators';
import {StorageService} from '../utils';

/**
 * Itercepta los errores que se producen al consultar el servidor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private storage: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError(err => {

      if (this.storage.getToken()) {
        if ([401].indexOf(err.status) !== -1) {
          this.authenticationService.refreshToken();
        }else {
          if ([403].indexOf(err.status) !== -1) {
            this.authenticationService.logOut();
          }
        }
      }
      return throwError(err);
    }))
  }
}
