import {Component, Input, OnInit} from '@angular/core';
import {Registro} from '../../../@core/model/registro.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Empleado, MetaDatosModel} from '../../../@core/model';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {EmpleadosDataService} from '../../../@core/datas';
import * as moment from 'moment';
import {ValidadorFormulariosService} from '../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-registros-mod',
  templateUrl: './registros-mod.component.html',
  styleUrls: ['./registros-mod.component.scss']
})
export class RegistrosModComponent implements OnInit {

  @Input() registro: Registro;
  registroForm: FormGroup;
  title = 'Registro';
  error: string[] = [];

  empleados: Empleado[] = [];
  metaEmpleados: MetaDatosModel;
  registros: Registro[] = [];
  metaRegistros: MetaDatosModel;

  constructor(
    protected ref: NbDialogRef<RegistrosModComponent>,
    private nbDialogService: NbDialogService,
    private empleadoDb: EmpleadosDataService,
    private validadorService: ValidadorFormulariosService
  ) {

    this.getEmpleados(1);

    this.registroForm = new FormGroup({
      inicioDate: new FormControl('', [Validators.required]),
      inicioTime: new FormControl('', [Validators.required]),
      finDate: new FormControl(''),
      finTime: new FormControl(''),
      empleadoUuid: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.registroForm.controls.inicioDate.setValue(moment(this.registro.inicio).format('YYYY-MM-DD'));
    this.registroForm.controls.inicioTime.setValue(moment(this.registro.inicio).format('HH:mm'));
    this.registroForm.controls.finDate.setValue(moment(this.registro.fin).format('YYYY-MM-DD'));
    this.registroForm.controls.finTime.setValue(moment(this.registro.fin).format('HH:mm'));
    this.registroForm.controls.empleadoUuid.setValue(this.registro.empleado.id);
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];

    if (this.validadorService.getFormValidationErrors(this.registroForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.registroForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.datosRegistros();
      this.ref.close({registro: this.registro});
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

  calcularDuracion () {
    let inicio = moment(this.registroForm.value.inicioDate + ' ' + this.registroForm.value.inicioTime);
    let fin = moment(this.registroForm.value.finDate + ' ' + this.registroForm.value.finTime)
    this.registro.duracion = String((moment.duration(fin.diff(inicio)).as('hours')));
  }

  datosRegistros() {
    this.registro.inicio = moment(this.registroForm.value.inicioDate + ' ' + this.registroForm.value.inicioTime).format('YYYY-MM-DD HH:ss:mm');
    this.registro.fin = moment(this.registroForm.value.finDate + ' ' + this.registroForm.value.finTime).format('YYYY-MM-DD HH:ss:mm');
    this.registro.control_terminado = this.registro.fin != null;
    this.registro.empleado_uuid = this.registroForm.value.empleadoUuid;
  }

}
