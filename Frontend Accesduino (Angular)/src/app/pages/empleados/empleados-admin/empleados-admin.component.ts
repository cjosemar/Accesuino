import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Empleado, MetaDatosModel} from '../../../@core/model';
import {NbDialogConfig, NbDialogService} from '@nebular/theme';
import {EmpleadosDataService} from '../../../@core/datas';
import {EditEmpleadoComponent} from './edit-empleado/edit-empleado.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmpleadosAdminComponent implements OnInit {

  public readonly IMGNOTFOUND = "577b9518-fc37-4d61-91b4-77ad9b635097";

  empleados: Empleado[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;
  total_Paginas: number = 1;

  constructor(
    private empleadosDb: EmpleadosDataService,
    private nbDialogService: NbDialogService,
    public permissionUser: PermissionCurrentService
  ) {

    empleadosDb.getEmpleados(1).then((res: any) => {
      this.pagina = 1;
      this.empleados = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    })
  }

  ngOnInit(): void {
  }

  getEmpleados(page: number) {
    this.pagina = page;
    this.empleadosDb.getEmpleados(page).then((res:any) => {
      this.empleados = res [0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    });
  }

  openEdit(empleado: Empleado = null) {
    this.nbDialogService.open(EditEmpleadoComponent, {
      context: {
        empleado: empleado
      },
      hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
          this.empleadosDb.createEmpleados(resultado.empleado).then(res=> {
            this.getEmpleados(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.empleadosDb.updateEmpleados(resultado.empleado).then(res => {
            this.getEmpleados(this.pagina);
          }).catch(error => {
            console.log(error);
          })
        }
      }
    });
  }

  deleteHorario(horario: Empleado) {
    return this.empleadosDb.deleteEmpleados(horario).then(() => {
      this.getEmpleados(this.pagina);
    })
  }

}
