import { Component, OnInit } from '@angular/core';
import {MetaDatosModel, Permiso} from '../../../@core/model';
import {NbDialogService} from '@nebular/theme';
import {PermisosDataService} from '../../../@core/datas';
import {EditPermisoComponent} from './edit-permiso/edit-permiso.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-permisos-admin',
  templateUrl: './permisos-admin.component.html',
  styleUrls: ['./permisos-admin.component.scss']
})
export class PermisosAdminComponent implements OnInit {

  permisos: Permiso[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;

  constructor(
    private nbDialogService: NbDialogService,
    private permisosDb: PermisosDataService,
    public permissionUser: PermissionCurrentService
  ) {
    permisosDb.getPermisos(1).then((res:any) => {
      this.pagina = 1;
      this.permisos = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });
  }

  ngOnInit(): void {
  }

  getPermisos(page: number) {
    this.pagina = page;
    if (page <= this.meta.total_pages && page > 0) {
      this.permisosDb.getPermisos(page).then((res:any) => {
        this.permisos = res[0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      })
    }
  }

  openEdit(permiso: Permiso = null) {
    this.nbDialogService.open(EditPermisoComponent, {
      context: {
        permiso: permiso
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
          this.permisosDb.createPermiso(resultado.permiso).then(res => {
            this.getPermisos(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.permisosDb.updatePermisos(resultado.permiso).then(res => {
            this.getPermisos(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        }
      }
    })
  }

  deletePermiso(permiso: Permiso) {
    return this.permisosDb.deletePermisos(permiso).then(() => {
      this.getPermisos(this.pagina);
    })
  }

}
