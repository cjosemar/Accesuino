import {Component, Input, OnInit} from '@angular/core';
import {Horario} from '../../../../@core/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import * as moment from 'moment';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.scss']
})
export class EditHorarioComponent implements OnInit {

  @Input() horario: Horario
  horarioForm : FormGroup;
  title: string = "Horario";
  new: boolean;
  error: string[] = [];

  constructor(
    protected ref: NbDialogRef<EditHorarioComponent>,
    private nbDialogService: NbDialogService,
    private validadorService: ValidadorFormulariosService
  ) {
    this.horarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      horarioInicio: new FormControl('00:00', [Validators.required]),
      horarioSalida: new FormControl('', []),
      horasTrabajo: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    if (this.horario == null) {
      this.new = true;
      this.title = 'Crear horario';
      this.horario = new class implements Horario {
        hora_inicio: string;
        hora_salida: string;
        horas_trabajo: string;
        id: string;
        nombre: string;
      }
    } else {
      this.new = false;
      this.title = 'Editar usuario';
      this.horarioForm.controls.nombre.setValue(this.horario.nombre);
      this.horarioForm.controls.horarioInicio.setValue(this.horario.hora_inicio);
      this.horarioForm.controls.horarioSalida.setValue(this.horario.hora_salida);
      this.horarioForm.controls.horasTrabajo.setValue(this.horario.horas_trabajo);
    }

    this.horarioForm.controls.horasTrabajo.valueChanges.subscribe(res => {
      if (this.horarioForm.controls.horarioInicio.value) {
        const entrada = moment(this.horarioForm.controls.horarioInicio.value, "HH:mm:ss");
        this.horarioForm.controls.horarioSalida.setValue(entrada.add(res, 'hour').format('HH:mm:ss'));
      }
    });
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];
    if (this.validadorService.getFormValidationErrors(this.horarioForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.horarioForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.getHorasTrabajo();
      this.horario.nombre = this.horarioForm.controls.nombre.value;
      this.horario.hora_inicio = moment(this.horarioForm.controls.horarioInicio.value, "HH:mm:ss").format('HH:mm:ss');
      this.horario.hora_salida = moment(this.horarioForm.controls.horarioSalida.value, "HH:mm:ss").format('HH:mm:ss');
      this.ref.close({horario: this.horario, new: this.new});
    }

  }

  getHorasTrabajo() {
    const entrada = moment(this.horarioForm.controls.horarioInicio.value, "HH:mm:ss");
    const salida = moment(this.horarioForm.controls.horarioSalida.value, "HH:mm:ss");
    this.horarioForm.controls.horasTrabajo.setValue(salida.diff(entrada, 'hour'));
  }



}
