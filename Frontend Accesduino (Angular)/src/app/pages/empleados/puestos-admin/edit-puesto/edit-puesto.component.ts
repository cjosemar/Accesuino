import {Component, Input, OnInit} from '@angular/core';
import {Puesto} from '../../../../@core/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-puesto',
  templateUrl: './edit-puesto.component.html',
  styleUrls: ['./edit-puesto.component.scss']
})
export class EditPuestoComponent implements OnInit {

  @Input() puesto: Puesto;
  puestoForm: FormGroup;
  title: string = 'Puesto';
  new: boolean;
  error: string[] = [];

  constructor(
    protected ref: NbDialogRef<EditPuestoComponent>,
    private nbDialogService: NbDialogService,
    private validadorService: ValidadorFormulariosService
  ) {
    this.puestoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (this.puesto == null) {
      this.new = true;
      this.title = 'Crear puesto';
      this.puesto = new class implements Puesto {
        id: string;
        nombre: string;
      }
    } else {
      this.new = false;
      this.title = 'Editar puesto';
      this.puestoForm.controls.nombre.setValue(this.puesto.nombre);
    }
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    if (this.validadorService.getFormValidationErrors(this.puestoForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.puestoForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.puesto.nombre = this.puestoForm.controls.nombre.value;
      this.ref.close({puesto: this.puesto, new: this.new});
    }
  }

}
