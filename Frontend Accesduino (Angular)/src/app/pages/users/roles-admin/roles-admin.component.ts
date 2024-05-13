import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MetaDatosModel, Role} from '../../../@core/model';
import {PermissionDataService, RolesDataService} from '../../../@core/datas';
import {EditRoleComponent} from './edit-role/edit-role.component';
import {NbDialogService} from '@nebular/theme';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.scss']
})
export class RolesAdminComponent implements OnInit {

  meta: MetaDatosModel;
  roles: Role[];
  paginador: number[];
  pagina: number = 1;

  @ViewChild('confirmDelete') confirmDelete: TemplateRef<any>;

  constructor(
    private roleDb: RolesDataService,
    private permissionDb: PermissionDataService,
    private nbDialogService: NbDialogService,
    public permissionUser: PermissionCurrentService
  ) {
    roleDb.getRoles(1).then((res: any) => {
      this.roles = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });
  }

  ngOnInit(): void {
  }

  getRoles(page: number) {
    this.pagina = page;
    if (page <= this.meta.total_pages && page > 0)
      this.roleDb.getRoles(page).then((res: any) => {
        this.roles = res[0];

        this.meta = res['meta'][0];
      });
  }

  openEdit(role: Role = null) {
    this.nbDialogService.open(EditRoleComponent, {
      context: {
        role: role
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
          // Create Role
          this.createRole(resultado.role, resultado.permisos);
        } else {
          this.updateRole(resultado.role, resultado.permisos);
        }
      }
    });
  }

  createRole(role: Role, permisos: {permiso: string, accion: number}[]) {
    return this.roleDb.createRole(role, permisos).then(() =>{

      this.getRoles(this.pagina);
    }).catch(error => {
      console.log(error);
      console.log(`Error creando role.\nError: ${error.error.error}. Code: ${error.status.code}. Status: ${error.statusText}`);
    })
  }

  updateRole(role: Role, permisos: {permiso: string, accion: number}[]) {
    return this.roleDb.updateRole(role, permisos).then(() =>{
      this.getRoles(this.pagina);
    }).catch(error => {
      console.log(error);
      console.log(`Error modificando role.\nError: ${error.error.error}. Code: ${error.status.code}. Status: ${error.statusText}`);
    })
  }

  deleteRole(role: Role) {
    return this.roleDb.deleteRole(role).then(() => {
      this.getRoles(this.pagina);
    }).catch(error => {
      console.log(error);
      console.log(`Error borrando role.\nError: ${error.error.error}. Code: ${error.status.code}. Status: ${error.statusText}`);
    })
  }

  getStauts(name: string) {

    if (name.startsWith('List')) {
      return '#274bdb'
    }
    if (name.startsWith('Create')) {
      return '#00b887'
    }
    if (name.startsWith('Delete')) {
      return '#db2c66'
    }
    if (name.startsWith('Update')) {
      return '#8f9bb3'
    }
  }

  confirmaBorrado(role: Role) {
    this.nbDialogService.open(this.confirmDelete, {context: role}).onClose.subscribe(confirmacion => {
      if (confirmacion) {
        this.deleteRole(role);
      }
    })
  }


}
