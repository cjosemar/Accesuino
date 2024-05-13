import { Component, OnInit } from '@angular/core';
import {MetaDatosModel, TipoPermiso} from '../../../@core/model';
import {NbDialogService} from '@nebular/theme';
import {TiposPermisoDataService} from '../../../@core/datas';
import {EditTipoPermisoComponent} from './edit-tipo-permiso/edit-tipo-permiso.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-tipos-permiso-admin',
  templateUrl: './tipos-permiso-admin.component.html',
  styleUrls: ['./tipos-permiso-admin.component.scss']
})
export class TiposPermisoAdminComponent implements OnInit {

  tipos: TipoPermiso[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;

  constructor(
    private nbDialogService: NbDialogService,
    private tipoPermisosDb: TiposPermisoDataService,
    public permissionUser: PermissionCurrentService
  ) {
    tipoPermisosDb.getTiposPermiso(1).then((res:any) => {
      this.pagina = 1;
      this.tipos = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    })
  }

  ngOnInit(): void {
  }

  getTiposPermiso(page: number) {
    this.pagina = page;
    if(page <= this.meta.total_pages && page > 0) {
      this.tipoPermisosDb.getTiposPermiso(page).then((res:any) => {
        this.tipos = res[0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      })
    }
  }

  openEdit(tipoPermiso: TipoPermiso = null) {
    this.nbDialogService.open(EditTipoPermisoComponent, {
      context: {
        tipoPermiso: tipoPermiso
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
          this.tipoPermisosDb.createTiposPermiso(resultado.tipoPermiso).then(res=> {
            this.getTiposPermiso(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.tipoPermisosDb.updateTipoPermiso(resultado.tipoPermiso).then(res => {
            this.getTiposPermiso(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        }
      }
    });
  }

  deleteTipoPermiso(tipoPermiso: TipoPermiso) {
    return this.tipoPermisosDb.deleteTipoPermiso(tipoPermiso).then(() => {
      this.getTiposPermiso(this.pagina);
    })
  }



}
