import {Component, OnInit} from '@angular/core';
import {DatosEmpresa, Asset} from '../../@core/model';
import {DatosEmpresaDataService} from '../../@core/datas/datos-empresa-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetsDataService} from '../../@core/datas/assets-data.service';
import {PermissionCurrentService} from '../../@core/auth/permission-current.service';
import {ValidadorFormulariosService} from '../../@core/utils/validador-formularios.service';


@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit {



  datos: DatosEmpresa;
  datosForm: FormGroup;
  title: string = 'Datos de la empresa';
  edicion: boolean = false;
  error: string[] = [];

  uploadResponse = {status: '', message: '', filepath: ''};
  file: File = null;
  imagePreview: string | ArrayBuffer = null;

  constructor(
    private datosEmpresaDb: DatosEmpresaDataService,
    private assetDb: AssetsDataService,
    public permissionUser: PermissionCurrentService,
    private validadorService: ValidadorFormulariosService
  ) {
    this.createFormDatos();

  }

  ngOnInit(): void {
    this.getDatosEmpresa();
    this.datosForm.controls.nombre.valueChanges.subscribe(nombre => {
      this.datos.nombre = nombre;
    });
    this.datosForm.controls.email.valueChanges.subscribe(email => {
      this.datos.email = email;
    });
    this.datosForm.controls.direccion.valueChanges.subscribe(direccion => {
      this.datos.direccion = direccion;
    });
    this.datosForm.controls.codigopostal.valueChanges.subscribe(codigopostal => {
      this.datos.codigopostal = codigopostal;
    });
    this.datosForm.controls.poblacion.valueChanges.subscribe(poblacion => {
      this.datos.poblacion = poblacion;
    });
    this.datosForm.controls.provincia.valueChanges.subscribe(provincia => {
      this.datos.provincia = provincia;
    });
    this.datosForm.controls.telefono.valueChanges.subscribe(telefono => {
      this.datos.telefono = telefono;
    });

  }

  getDatosEmpresa() {

    this.datosEmpresaDb.getDatosEmpresa().then(datos => {
      this.datos = datos;
      this.datosForm.controls.nombre.setValue(datos.nombre);
      this.datosForm.controls.email.setValue(datos.email);
      this.datosForm.controls.direccion.setValue(datos.direccion);
      this.datosForm.controls.codigopostal.setValue(datos.codigopostal);
      this.datosForm.controls.poblacion.setValue(datos.poblacion);
      this.datosForm.controls.provincia.setValue(datos.provincia);
      this.datosForm.controls.telefono.setValue(datos.telefono);
      this.datosForm.controls.asset_uid.setValue(datos.asset_uuid == null ? this.assetDb.getUIDNotImage() : datos.asset_uuid);
    }).catch(error => {
      console.log(error);
    })
  }

  createFormDatos() {
    this.datosForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl( '', []),
      codigopostal: new FormControl('',  [Validators.maxLength(5), Validators.minLength(5)]),
      poblacion: new FormControl('', []),
      provincia: new FormControl('',[]),
      telefono: new FormControl('',[]),
      asset_uid: new FormControl('',[])
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload= (_event) => {
        this.imagePreview = reader.result;
      }
    }
  }

  cancelar() {
    this.getDatosEmpresa();
    this.error = [];
    this.edicion = false;
    this.imagePreview = null;
    this.file = null
  }

  guardar() {
    if (this.validadorService.getFormValidationErrors(this.datosForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.datosForm.controls).forEach(error => {
        console.log(error);
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {
      if (this.file == null) {
        // guardar datos sin imagen
        this.datosEmpresaDb.updateDatosEmpresa(this.datos).then(dat => {

          this.getDatosEmpresa();
          this.cancelar();
        })
      } else {
        // guardar imagen con imagen
        this.assetDb.uploadFile(this.file).toPromise().then((img:Asset) => {

          this.datos.asset_uuid = img.id;

          this.datosEmpresaDb.updateDatosEmpresa(this.datos).then(dat => {

            this.getDatosEmpresa();
            this.cancelar();
          })
        });
      }
    }

  }

}
