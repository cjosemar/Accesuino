import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {Empleado, MetaDatosModel, TipoPermiso, Permiso} from '../../../../@core/model';
import {EmpleadosDataService, TiposPermisoDataService} from '../../../../@core/datas';
import * as moment from 'moment';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.component.html',
  styleUrls: ['./edit-permiso.component.scss']
})
export class EditPermisoComponent implements OnInit {

  @Input() permiso: Permiso;
  permisoForm: FormGroup;
  title: string = 'Permiso';
  new: boolean;
  error: string[] = [];

  empleados: Empleado[] = [];
  metaEmpleados: MetaDatosModel;
  tiposPermisos: TipoPermiso[] = [];
  metaTiposPermiso: MetaDatosModel;

  constructor(
    protected ref: NbDialogRef<EditPermisoComponent>,
    private nbDialogService: NbDialogService,
    private empleadoDb: EmpleadosDataService,
    private tipoPermisosDb: TiposPermisoDataService,
    private validadorService: ValidadorFormulariosService
  ) {

    this.getEmpleados(1);
    this.getPermisos(1);


    this.permisoForm = new FormGroup({
      observaciones: new FormControl('', [Validators.required]),
      inicio: new FormControl('', [Validators.required]),
      fin: new FormControl('', [Validators.required]),
      empleadoUuid: new FormControl('', [Validators.required]),
      tipoPermisoUuid: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (this.permiso == null) {
      this.new = true;
      this.title = 'Crear permiso';
      this.permiso = new class implements Permiso {
        empleado: Empleado;
        empleado_uuid: string;
        fin: string;
        id: string;
        inicio: string;
        observaciones: string;
        tipopermisotrabajo: TipoPermiso;
        tipoPermiso_uuid: string;
      }
    } else {
      this.new = false;
      this.title = 'Editar Permiso';
      this.permisoForm.controls.observaciones.setValue(this.permiso.observaciones);
      this.permisoForm.controls.inicio.setValue(moment(this.permiso.inicio).format('YYYY-MM-DD'));
      this.permisoForm.controls.fin.setValue(moment(this.permiso.fin).format('YYYY-MM-DD'));
      this.permisoForm.controls.empleadoUuid.setValue(this.permiso.empleado.id);
      this.permisoForm.controls.tipoPermisoUuid.setValue(this.permiso.tipopermisotrabajo.id);
    }
  }

  cancelar() {
    this.ref.close(null);
  }


  guardar() {
    this.error = [];
    if (this.validadorService.getFormValidationErrors(this.permisoForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.permisoForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.datosPermiso();
      this.ref.close({permiso: this.permiso, new: this.new});
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

  private getPermisos(pagina: number) {
    this.tipoPermisosDb.getTiposPermiso(pagina).then((res:any) => {
      this.metaTiposPermiso = res['meta'][0];
      this.tiposPermisos = [...this.tiposPermisos, ...res[0]];
      if (this.metaTiposPermiso.total_pages != this.metaTiposPermiso.current_page) {
        this.getPermisos(this.metaTiposPermiso.current_page + 1);
      }
    })
  }

  private datosPermiso() {
    this.permiso.observaciones = this.permisoForm.controls.observaciones.value;
    this.permiso.inicio = moment(this.permisoForm.controls.inicio.value, "YYYY-MM-DD").format('YYYY-MM-DD');
    this.permiso.fin = moment(this.permisoForm.controls.fin.value, "YYYY-MM-DD").format('YYYY-MM-DD');
    this.permiso.empleado_uuid = this.permisoForm.controls.empleadoUuid.value;
    this.permiso.tipopermisotrabajo_uuid = this.permisoForm.controls.tipoPermisoUuid.value;
  }
}
