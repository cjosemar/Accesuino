import { Injectable }                                         from '@angular/core';
import { HttpClient }                                         from '@angular/common/http';
import { Token }                                              from '../model';
import { EnvironmentService, ServicesString, StorageService } from '../utils';
import { UserCurrentService }                                 from './user-current.service';
import { ActivatedRoute, Router }                             from '@angular/router';
import { Observable }                                         from 'rxjs';
import { catchError, mapTo, tap }                             from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private api: EnvironmentService,
    private storage: StorageService,
    private userCurrentService: UserCurrentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Autentica usuario
   * @param form
   */
  login(form: FormData): Observable<any> {
    const body: FormData = this.api.setLoginJson(form);
    return this.http.post(this.api.setAuthService(ServicesString.authToken), body).pipe(
      tap((token: Token) => {
        //console.log(token);
        this.storage.setToken(token);
        this.userCurrentService.loadUser();
      }),
      mapTo(true),
      catchError(error => {
        return error;
      })
    );
  }

  /**
   * Desautentica a usuario
   */
  logOut() {
    if (this.storage.getToken()) {
      return this.http.get(this.api.setApiService(ServicesString.logout) ).toPromise().then(res => {
        this.storage.removeToken();
        this.userCurrentService.removeUser();
      }).catch(error => {
        console.log(error);
      });
    }
  }


  /**
   * Refresca token expirado
   */
  refreshToken() {
    return this.http.post(this.api.setAuthService(ServicesString.authRefrehToken), this.storage.getToken().refresh_token).pipe(
      tap((token: Token) => {
        this.storage.setToken(token);
      })
    );
  }


}
