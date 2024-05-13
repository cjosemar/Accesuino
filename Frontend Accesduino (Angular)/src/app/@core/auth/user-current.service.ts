import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Permission, User} from '../model';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString, StorageService} from '../utils';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserCurrentService {

  private currentUserSubject: BehaviorSubject<User>;
  public currenUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private api: EnvironmentService,
    private storage: StorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.getCurrentUser());
    this.currenUser = this.currentUserSubject.asObservable();

  }

  /**
   * Recoge datos del usuario autenticado asi como su roles y permisos
   */
  loadUser(): void {
    this.http.get<User>(this.api.setApiService(ServicesString.me)).toPromise().then(data => {
      if (data) {
        this.currentUserSubject.next(data);
        this.storage.setCurrentUser(data);
      }else {
        this.currentUserSubject.next(null);
        this.storage.removeCurrentUser();
      }
    }).catch(error => {
      this.currentUserSubject.next(null);
      this.storage.removeCurrentUser();
    });
  }

  /**
   * Resetea Usuario autenticado de sistema
   */
  removeUser() {
    this.currentUserSubject.next(null);
    this.storage.removeCurrentUser();
  }

  /**
   * Devuelve si hay alguien logueado en el sistema
   */
  isLoggeddIn() {
    return !!this.storage.getToken();
  }

  /**
   * Devuelve datos de usuario autenticado
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  /**
   * Devuelve datos de usuario autenticado en observable.
   */
  onUserInfoChanged(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

}
