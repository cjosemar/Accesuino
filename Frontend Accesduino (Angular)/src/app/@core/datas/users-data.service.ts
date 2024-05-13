import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService, ServicesString} from '../utils';
import {Role, User} from '../model';

@Injectable({
  providedIn: 'root'
})
/**
 * Gestiona usuarios en backend
 */
export class UsersDataService {

  constructor(
    private http: HttpClient,
    private api: EnvironmentService
  ) { }

  /**
   * Devuelve lista de usuarios paginado
   * @param page
   */
  getUsers(page: number) {
    return this.http.get(this.api.setApiServicePage(ServicesString.users, page)).toPromise();
  }

  /**
   * Crea usuario nuevo
   * @param user
   */
  createUsers(user: User) {
    const u: User = {...user};
    u.roles = this.getRolesUser(user);
    return this.http.post(this.api.setApiService(ServicesString.users), u).toPromise();
  }

  /**
   * Modifica usuario
   * @param user
   */
  updateUser(user: User) {
    const u: User = {...user};
    u.roles = this.getRolesUser(user);
    return this.http.put(this.api.setApiServiceById(ServicesString.users, u.id), u).toPromise();
  }

  /**
   * Borra usuario
   * @param user
   */
  deleteUser(user: User) {
    return this.http.delete(this.api.setApiServiceById(ServicesString.users, user.id)).toPromise();
  }

  /**
   * Devuelve roles de un usuario
   * @param user
   * @private
   */
  private getRolesUser(user: User) {
    const roles: string[] = [];
    (user.roles[0] as Role[]).forEach(r => {
      roles.push(r.name);
    });
    return roles;
  }

}
