import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {Permission, Role} from '../../../../@core/model';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  @Input() role: Role;

  permisos: {permiso: string, accion: number}[] = [];
  roleForm: FormGroup;
  title: string = 'Roles';
  new:boolean;
  error: string[] = [];

  constructor(
    protected ref: NbDialogRef<EditRoleComponent>,
    private validadorService: ValidadorFormulariosService
  ) {
    this.roleForm = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (this.role == null) {
      this.new = true;
      this.title = 'Crear Rol';
      this.role = new class implements Role {
        name: string;
        permissions: [Permission[]];
      }
    }
    else {
      this.new = false;
      this.role.permissions[0].forEach(p => {
        this.permisos.push({permiso: p.name, accion: 0});
      });
      this.title = 'Editar Rol';
      this.roleForm.setValue({nombre: this.role.name});
    }
  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];
    if (this.permisos.filter(p => p.accion == 1 || p.accion == -1).length == 0) {
      this.error.push("Hay que asignar al menos un permiso al rol.");
    }

    if (this.validadorService.getFormValidationErrors(this.roleForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.roleForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      if (this.error.length == 0) {
        this.role.name = this.roleForm.controls.nombre.value;
        this.ref.close({role: this.role, permisos: this.permisos, new: this.new})
      }
    }
  }

  isPermission(permiso: string) {
    return !!this.permisos.find(p => p.permiso === permiso);
  }

  updatedChecked(a: any, valor: string) {
    if (a.target.checked) {
      this.addPermiso(valor);
    } else {
      this.removePermiso(valor);
    }
  }

  private addPermiso(valor: string) {
    if (this.permisos.find(p => p.permiso === valor)) {
      this.permisos.find(p => p.permiso === valor).accion ++;
    } else {
      this.permisos.push({permiso: valor, accion: 1});
    }
  }

  private removePermiso(valor: string) {
    this.permisos.find(p => p.permiso === valor).accion --;
  }

}
