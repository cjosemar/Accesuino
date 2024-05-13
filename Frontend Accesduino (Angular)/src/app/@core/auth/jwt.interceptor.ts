import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {EnvironmentService, ServicesString, StorageService} from '../utils';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Token} from '../model';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private api: EnvironmentService,
    private storage: StorageService,
    private router: Router
  ) {}

  /**
   * Intercepta peticiones http para introducir token en la consulta.
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(this.api.url);
    const isLogin = !request.url.endsWith(ServicesString.authToken);

    if (isLogin && this.storage.getToken() && isApiUrl) {
      request = JwtInterceptor.injectToken(request, this.storage.getToken().access_token);
    }

    return next.handle(request).pipe(catchError(error => {

      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log(error);
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }))

  }

  private static injectToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenSubject.next(null);
      return this.authenticationService.refreshToken().pipe(
        switchMap((token: Token) => {
          this.isRefreshing = false;
          this.tokenSubject.next(token);
          return next.handle(JwtInterceptor.injectToken(request, token.access_token)).pipe(catchError(error => {
            console.log(error);
            return throwError(error);
          }));
        }),
        catchError(error => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
          this.storage.removeCurrentUser();
          this.storage.removeToken();
          return throwError(error);
        })
      )
    } else {
     return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(JwtInterceptor.injectToken(request, token.access_token)).pipe(catchError(error => {
            console.log(error);
            return throwError(error);
          }));
        }),
       catchError(error => {
         console.log(error);
         return throwError(error);
       })
      );
    }
  }

}
