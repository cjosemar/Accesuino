import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadorFormulariosService {

  constructor() { }

  getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach(key => {
      const control = controls[ key ];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors = controls[ key ].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ]
          });
        });
      }
    });
    console.log(errors);
    return errors;
  }

  getMensajeError(error: AllValidationErrors) {
    if (error.error_name == 'required') {
      return 'El campo ' + error.control_name + ' es obligatorio';
    } else if (error.error_name == 'email') {
      return 'El campo ' + error.control_name + ' no es un email valido';
    } else if (error.error_name == 'minlength') {
      return 'El campo ' + error.control_name + ' debe tener al menos ' + error.error_value.requiredLength + ' caracteres.'
    } else if (error.error_name == 'maxlength') {
      return 'El campo ' + error.control_name + ' debe tener como maximo ' + error.error_value.requiredLength + ' caracteres.'
    }
  }

}
