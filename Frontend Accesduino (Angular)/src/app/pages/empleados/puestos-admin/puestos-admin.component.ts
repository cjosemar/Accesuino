import { Component, OnInit } from '@angular/core';
import {MetaDatosModel, Puesto} from '../../../@core/model';
import {NbDialogService} from '@nebular/theme';
import {PuestosDataService} from '../../../@core/datas';
import {EditPuestoComponent} from './edit-puesto/edit-puesto.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-puestos-admin',
  templateUrl: './puestos-admin.component.html',
  styleUrls: ['./puestos-admin.component.scss']
})
export class PuestosAdminComponent implements OnInit {

  puestos: Puesto[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;

  constructor(
    private nbDialogService: NbDialogService,
    private puestosDb: PuestosDataService,
    public permissionUser: PermissionCurrentService
  ) {
    puestosDb.getPuestos(1).then((res: any) => {
      this.pagina = 1;
      this.puestos = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });
  }

  ngOnInit(): void {
  }

  getPuestos(page: number) {
    this.pagina = page;
    if (page <= this.meta.total_pages && page > 0) {
      this.puestosDb.getPuestos(page).then((res:any) => {
        this.puestos = res[0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      });
    }
  }

  openEdit(puesto: Puesto = null) {
    this.nbDialogService.open(EditPuestoComponent, {
      context: {
        puesto: puesto
      }, hasScroll: false
    }).onClose.subscribe(resultado => {

      if (resultado !== null) {
        if (resultado.new) {
          this.puestosDb.createPuestos(resultado.puesto).then(res=> {
            this.getPuestos(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.puestosDb.updatePuestos(resultado.puesto).then(res => {
            this.getPuestos(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        }
      }
    });
  }

  deletePuesto(puesto: Puesto) {
    return this.puestosDb.deletePuestos(puesto).then(() => {
      this.getPuestos(this.pagina);
    })
  }

}
