import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrosDataService} from '../../@core/datas/registros-data.service';
import {Registro} from '../../@core/model/registro.model';
import {NavigationStart, Router} from '@angular/router';
import {ValidadorFormulariosService} from '../../@core/utils/validador-formularios.service';
import {NbDialogService} from '@nebular/theme';
import {RegistrosModComponent} from '../../pages/registros/registros-mod/registros-mod.component';
import {AyudaRegistroComponent} from '../ayuda-registro/ayuda-registro.component';

@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.scss']
})
export class RegistroLoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string[] = [];
  registro: Registro;
  mostrar: string = null;


  constructor(
    private formBuilder: FormBuilder,
    private registrosDb: RegistrosDataService,
    private validadorService: ValidadorFormulariosService,
    private nbDialogService: NbDialogService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  registrar() {
    this.mostrar = null;
    this.error = [];
    if (this.validadorService.getFormValidationErrors(this.loginForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.loginForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.registrosDb.registrarByLogin(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then((res:any) => {
        if (res.control_terminado >= 0) {
          this.mostrar = 'correcto';
          this.registro = res;
          this.loginForm.reset();
        } else {
          this.mostrar = 'error';
          this.error.push('Comprueba si los datos son correctos.');
          console.log('error');
        }
      }).catch(() => {
        this.error.push('Comprueba si los datos son correctos.');
      })
    }
  }

  irAdministracion() {
    this.router.navigate(['/login']);
  }

  irAyudaRegistro() {
    this.router.navigate(['/registro/ayuda']);
  }

}
