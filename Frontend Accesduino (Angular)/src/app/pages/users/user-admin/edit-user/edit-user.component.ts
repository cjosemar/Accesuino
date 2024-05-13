import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Role, User} from '../../../../@core/model';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesDataService} from '../../../../@core/datas';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild('roles') rolesTemplate: TemplateRef<any>;
  @Input() user: User;
  roles: Role[];
  error: string[] = [];

  userForm: FormGroup;
  title: string = 'Usuarios';
  new: boolean;


  constructor(
    protected ref: NbDialogRef<EditUserComponent>,
    private nbDialogService: NbDialogService,
    private roleDb: RolesDataService,
    private validadorService: ValidadorFormulariosService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.min(8)]),
      password_confirmation: new FormControl('', [Validators.min(8)])
    });
  }

  ngOnInit(): void {
    this.rolesNoAsignados();
    if (this.user == null) {
      this.new = true;
      this.title = 'Crear Usuario';
      this.user = new class implements User {
        email: string;
        name: string;
        roles: [Role[]]= [[]];
      }
      this.userForm.controls.password.setValidators([Validators.required, Validators.minLength(8)]);

      this.userForm.controls.password_confirmation.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      this.new = false;
      this.title = 'Editar Usuario'
      this.userForm.controls.email.setValue(this.user.email);
      this.userForm.controls.name.setValue(this.user.name);
    }

  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];
    if (this.userForm.controls.password.value != '') {
      if (this.userForm.controls.password.value != this.userForm.controls.password_confirmation.value ) {
        this.error.push('Los campos password y password_confirmation tienen que ser iguales.');
      }
    }
    if (this.user.roles[0] == 0 ) {
      this.error.push('Hay que asignar un rol al usuario.');
    }
    if (this.validadorService.getFormValidationErrors(this.userForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.userForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {

      if (this.error.length == 0) {
        this.user.name = this.userForm.controls.name.value;
        this.user.email = this.userForm.controls.email.value;
        this.user.password = this.userForm.controls.password.value;
        this.user.password_confirmation = this.userForm.controls.password_confirmation.value;
        this.ref.close({user: this.user, new: this.new});
      }
    }
  }

  openRoles(tipo: 'add' | 'remove') {
    this.nbDialogService.open(this.rolesTemplate, {context: tipo === 'add' ? this.roles : this.user.roles[0]}).onClose.subscribe((rol: Role) => {
      if (rol) {
        if (tipo == 'add') {
          (this.user.roles[0] as Role[]).push(rol);
        } else {
          const i =(this.user.roles[0] as Role[]).indexOf(rol) ;
          i !== -1 && (this.user.roles[0] as Role[]).splice(i, 1);
        }
        this.rolesNoAsignados();
      }
    })
  }

  private rolesNoAsignados() {
    // Array roles que no tiene usuario asignado
    this.roleDb.getAllRoles().then(res => {
      this.roles = res[0];
      if (this.roles.length > 0) {
        (this.user.roles[0] as Role[]).forEach(r => {
          const i = this.roles.findIndex(ro => ro.id === r.id);
          if (i != 1) {
            this.roles.splice(i, 1);
          }
        });
      }
    });
  }

}
