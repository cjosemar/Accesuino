import { Component, OnInit } from '@angular/core';
import {Horario, MetaDatosModel} from '../../../@core/model';
import {HorariosDataService} from '../../../@core/datas';
import {NbDialogService} from '@nebular/theme';
import {EditHorarioComponent} from './edit-horario/edit-horario.component';
import {PermissionCurrentService} from '../../../@core/auth/permission-current.service';

@Component({
  selector: 'app-horarios-admin',
  templateUrl: './horarios-admin.component.html',
  styleUrls: ['./horarios-admin.component.scss']
})
export class HorariosAdminComponent implements OnInit {

  horarios: Horario[];
  meta: MetaDatosModel;
  paginador: number[];
  pagina: number;


  constructor(
    private horarioDb: HorariosDataService,
    private nbDialogService: NbDialogService,
    public permissionUser: PermissionCurrentService
  ) {
    horarioDb.getHorarios(1).then((res: any) => {
      this.pagina = 1;
      this.horarios = res[0];
      this.meta = res['meta'][0];
      if (res['meta'][0].total_pages > 1) {
        this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
      }
    })
  }

  ngOnInit(): void {
  }

  getHorarios(page: number) {
    this.pagina = page;
    if (page <= this.meta.total_pages && page > 0) {
      this.horarioDb.getHorarios(page).then((res:any) => {
        this.horarios = res [0];
        this.meta = res['meta'][0];
        if (res['meta'][0].total_pages > 1) {
          this.paginador = new Array(res['meta'][0].total_pages).fill('').map((x,i) => i+1);
        }
      });
    }

  }

  openEdit(horario: Horario = null) {
    this.nbDialogService.open(EditHorarioComponent, {
      context: {
        horario: horario
      }, hasScroll: false
    }).onClose.subscribe(resultado => {
      if (resultado !== null) {
        if (resultado.new) {
         this.horarioDb.createHorario(resultado.horario).then(res=> {
           this.getHorarios(this.pagina);
         }).catch(error => {
           console.log(error);
         })
       } else {
         this.horarioDb.updateHorario(resultado.horario).then(res => {
           this.getHorarios(this.pagina);
         }).catch(error => {
           console.log(error);
         })
       }
      }
    });
  }

  deleteHorario(horario: Horario) {
    return this.horarioDb.deleteHorario(horario).then(() => {
      this.getHorarios(this.pagina);
    })
  }

}
