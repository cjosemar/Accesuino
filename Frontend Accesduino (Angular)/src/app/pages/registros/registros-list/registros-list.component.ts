import { Component, OnInit } from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {RegistrosDataService} from '../../../@core/datas/registros-data.service';
import {Empleado, MetaDatosModel} from '../../../@core/model';
import {Registro} from '../../../@core/model/registro.model';
import {EmpleadosDataService} from '../../../@core/datas';
import {RegistrosModComponent} from '../registros-mod/registros-mod.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-registros-list',
  templateUrl: './registros-list.component.html',
  styleUrls: ['./registros-list.component.scss']
})
export class RegistrosListComponent implements OnInit {

  registros: Registro[];
  meta: MetaDatosModel;
  empleados: Empleado[] = [];
  metaEmpleados: MetaDatosModel;
  paginador: number[];
  pagina: number;
  empleadoUUIDSelect: string = null;

  constructor(
    private nbDialogService: NbDialogService,
    private registrosDb: RegistrosDataService,
    private empleadoDb: EmpleadosDataService,
    public permissionUser: PermissionCurrentService
  ) {
    this.getEmpleados(1);
    this.registrosDb.getRegistros(1).then(res =>{
      this.pagina = 1;
      this.registros = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    })
  }

  ngOnInit(): void {
  }

  getRegistros(page: number) {
    this.pagina = page;
    if(this.empleadoUUIDSelect != null) {
      this.registrosDb.getRegistrosEmpleados(page, this.empleadoUUIDSelect).then(res => {
        this.registros = res[0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      });
    } else {
      this.registrosDb.getRegistros(page).then(res =>{
        this.registros = res[0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      })
    }
  }

  private getEmpleados(pagina: number) {

    this.empleadoDb.getEmpleados(pagina).then((res:any) => {
      this.metaEmpleados = res['meta'][0];
      this.empleados = [...this.empleados, ...res[0]];
      if (this.metaEmpleados.total_pages != this.metaEmpleados.current_page) {
        this.getEmpleados(this.metaEmpleados.current_page + 1);
      }
    });
  }

  onSelectionChange($event) {
    Promise.resolve(this.empleadoUUIDSelect = $event.value).then(() => {
      this.getRegistros(this.pagina);
    });
  }

  openEdit(registro: Registro) {
    this.nbDialogService.open(RegistrosModComponent, {
      context: {
        registro: registro
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado != null) {
        this.registrosDb.updateRegistro(resultado.registro).then(res => {
            this.getRegistros(this.pagina);

        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  deleteRegistros(registro: Registro) {
    return this.registrosDb.deleteRegistro(registro).then(() => {
      this.getRegistros(this.pagina);
    })
  }

}
