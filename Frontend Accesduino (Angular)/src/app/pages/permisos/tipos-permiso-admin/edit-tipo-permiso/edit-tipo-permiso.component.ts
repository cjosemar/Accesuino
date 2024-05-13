import {Component, Input, OnInit} from '@angular/core';
import {TipoPermiso} from '../../../../@core/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-tipo-permiso',
  templateUrl: './edit-tipo-permiso.component.html',
  styleUrls: ['./edit-tipo-permiso.component.scss']
})
export class EditTipoPermisoComponent implements OnInit {

  @Input() tipoPermiso: TipoPermiso;
  tipoPermisoForm: FormGroup;
  title: string = 'Tipo Permiso';
  new: boolean;
  error: string[] = [];

  constructor(
    protected ref: NbDialogRef<EditTipoPermisoComponent>,
    private nbDialogService: NbDialogService,
    private validadorService: ValidadorFormulariosService
  ) {
    this.tipoPermisoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    if (this.tipoPermiso == null) {
      this.new = true;
      this.title = 'Crear tipo permiso';
      this.tipoPermiso = new class implements TipoPermiso {
        descripcion: string;
        id: string;
        nombre: string;
      }
    } else {
      this.new = false;
      this.title = 'Editar tipo permiso';
      this.tipoPermisoForm.controls.nombre.setValue(this.tipoPermiso.nombre);
      if (this.tipoPermiso.descripcion != null) {
        this.tipoPermisoForm.controls.descripcion.setValue(this.tipoPermiso.descripcion);
      }
    }
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];

    if (this.validadorService.getFormValidationErrors(this.tipoPermisoForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.tipoPermisoForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.tipoPermiso.nombre = this.tipoPermisoForm.controls.nombre.value;
      this.tipoPermiso.descripcion = this.tipoPermisoForm.controls.descripcion.value;
      this.ref.close({tipoPermiso: this.tipoPermiso, new: this.new});
    }
  }

}
