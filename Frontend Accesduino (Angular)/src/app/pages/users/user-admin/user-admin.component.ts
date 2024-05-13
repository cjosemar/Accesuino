import { Component, OnInit } from '@angular/core';
import {UsersDataService} from '../../../@core/datas';
import {MetaDatosModel, Role, User} from '../../../@core/model';
import {ActivatedRoute} from '@angular/router';
import {NbDialogConfig, NbDialogService} from '@nebular/theme';
import {EditUserComponent} from './edit-user/edit-user.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  readonly idAdmin: string = 'cfe59746-669d-42d7-a868-0ad257cf9b4a';

  users: User[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;

  constructor(
    private usersDb: UsersDataService,
    private nbDialogService: NbDialogService,
    public permissionUser: PermissionCurrentService
  ) {
    usersDb.getUsers(1).then((res: any) => {
      this.pagina=1;
      this.users = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });
  }

  ngOnInit(): void {
  }

  getUsers(page: number) {
    this.pagina = page;
    if (page <= this.meta.total_pages && page > 0){
      this.usersDb.getUsers(page).then((res: any) => {
        this.users = res[0];

        this.meta = res['meta'][0];
      });
    }
  }

  openEdit(user: User = null) {
    this.nbDialogService.open(EditUserComponent, {
      context: {
        user: user
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
          // Create User
          this.usersDb.createUsers(resultado.user).then(res => {
            this.getUsers(this.pagina);
          }). catch(error => {
            console.log(error);
          });

        } else {
          this.usersDb.updateUser(resultado.user).then(res => {
            this.getUsers(this.pagina);
          }).catch(error => {
            console.log(error);
          });

        }
      }
    });
  }
  delete(user: User) {
    return this.usersDb.deleteUser(user).then(() => {
      this.getUsers(this.pagina);
    })
  }

}
