import { Component, OnInit } from '@angular/core';
import {MetaDatosModel, Permission} from '../../../@core/model';
import {PermissionDataService} from '../../../@core/datas';
import {ActivatedRoute} from '@angular/router';
import {NbDialogConfig, NbDialogService} from '@nebular/theme';
import {EditPermissionsComponent} from './edit-permissions/edit-permissions.component';

@Component({
  selector: 'app-permissions-admin',
  templateUrl: './permissions-admin.component.html',
  styleUrls: ['./permissions-admin.component.scss']
})
export class PermissionsAdminComponent implements OnInit {

  meta: MetaDatosModel;
  permisos: Permission[];
  paginador: number[];
  paginaActual: number;

  constructor(
    private permissionsDb: PermissionDataService,
    private nbDialogService: NbDialogService
  ) {
    permissionsDb.getPermission(1).then((res: any) => {
      this.permisos = res[0];

      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });

  }

  ngOnInit(): void {

  }

  getPermission(page: number) {
    this.paginaActual = page;
    if (page <= this.meta.total_pages && page > 0)
    this.permissionsDb.getPermission(page).then((res: any) => {
      this.permisos = res[0];
      this.meta = res['meta'][0];
    });
  }



}
