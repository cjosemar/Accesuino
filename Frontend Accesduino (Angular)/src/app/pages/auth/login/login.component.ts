import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, UserCurrentService} from '../../../@core/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../../@core/utils';
import {ValidadorFormulariosService} from '../../../@core/utils/validador-formularios.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string[] = [];
  mensaje: string = null;
  formData: FormData;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserCurrentService,
    private validadorService: ValidadorFormulariosService,
    private storage: StorageService
  ) {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/pages']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.formData = new FormData();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  login() {
    this.error = [];
    this.mensaje = null;
    this.submitted = true;
    const data = new FormData();
    data.append('username',this.loginForm.value.email);
    data.append('password', this.loginForm.value.password);
    if (this.validadorService.getFormValidationErrors(this.loginForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.loginForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      this.authenticationService.login(data).subscribe(success => {
        if (success === true) {
          this.router.navigate(['/pages'], {relativeTo: this.route});
        } else {
          console.log(success);
        }
      });
    }



  }

  irRegistro() {
    this.router.navigate(['/']);
  }

  irAyudaRegistro() {
      this.router.navigate(['/ayudaGestion']);
  }





}
