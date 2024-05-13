import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Permission} from '../../../../@core/model';
import {NbDialogRef} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit {

  @Input() permiso: Permission;

  permisoForm: FormGroup;

  title: string = 'Permisos';

  constructor(
    protected ref: NbDialogRef<EditPermissionsComponent>,
    private route: ActivatedRoute
  ) {
    this.permisoForm = new FormGroup({
      nombre: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    if (this.permiso == null) {
      this.title = 'Crear Permiso';
      this.permiso  = new class implements Permission {
        created_at: string;
        name: string;
      }
    }else {
      this.title = 'Editar Permiso';
      this.permisoForm.setValue({nombre: this.permiso.name});
    }
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.permiso.name = this.permisoForm.controls.nombre.value;

    this.ref.close(this.permiso)
  }




}
