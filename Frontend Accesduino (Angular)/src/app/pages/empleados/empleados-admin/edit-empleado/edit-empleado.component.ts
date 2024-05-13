import { Component, Input, OnInit }                                   from '@angular/core';
import { Asset, Empleado, Horario, MetaDatosModel, Puesto }           from '../../../../@core/model';
import { FormControl, FormGroup, Validators }                         from '@angular/forms';
import { NbDialogRef, NbDialogService }                               from '@nebular/theme';
import { AssetsDataService, HorariosDataService, PuestosDataService } from '../../../../@core/datas';
import {ValidadorFormulariosService} from '../../../../@core/utils/validador-formularios.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {

  private readonly NOTIMAGEASSET: string = '577b9518-fc37-4d61-91b4-77ad9b635097';

  @Input() empleado: Empleado;
  empleadoForm: FormGroup;
  title: string = "Empleado";
  new: boolean;
  error: string[] = [];

  horarios: Horario[] = [];
  metaHorarios: MetaDatosModel;
  puestos: Puesto[] = [];
  metaPuestos: MetaDatosModel;

  file: File = null;
  imagePreview: string | ArrayBuffer = null;


  constructor(
    protected ref: NbDialogRef<EditEmpleadoComponent>,
    private nbDialogService: NbDialogService,
    private horarioDb: HorariosDataService,
    private puestosDb: PuestosDataService,
    private assetDb: AssetsDataService,
    private validadorService: ValidadorFormulariosService
  ) {

    this.getPuestos(1);

    this.getHorarios(1);

    this.empleadoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      nif: new FormControl('', [Validators.required]),
      direccion: new FormControl('', []),
      poblacion: new FormControl('', []),
      codPostal: new FormControl('', [Validators.maxLength(5), Validators.minLength(5)]),
      provincia: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', []),
      password: new FormControl('', [ Validators.min(8)]),
      password_confirmation: new FormControl('', [Validators.min(8)]),
      costeHora: new FormControl('', []),
      costeHoraExtra: new FormControl('', []),
      uidTarjeta: new FormControl('', []),
      puestoUuid: new FormControl('', [Validators.required]),
      horarioUuid: new FormControl('', [Validators.required]),
      assetUuid: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    if (this.empleado == null) {
      this.new = true;
      this.title = 'Crear empleado';
      this.empleado = new class implements Empleado {
        apellidos: string;
        asset: Asset;
        asset_uuid: string;
        codigopostal: string;
        coste_hora: number;
        coste_hora_extra: number;
        direccion: string;
        email: string;
        horario: Horario;
        horario_uuid: string;
        id: string;
        nif: string;
        nombre: string;
        password: string;
        password_confirmation: string;
        poblacion: string;
        provincia: string;
        puesto: Puesto;
        puesto_uuid: string;
        telefono: string;
        uid_tarjeta: string;
      }
      this.empleadoForm.controls.password.setValidators(Validators.required);
      this.empleadoForm.controls.password_confirmation.setValidators(Validators.required);
      this.imagePreview = this.assetDb.getNotImag();

    } else {
      this.new = false;
      this.title = 'Editar empleado';
      this.empleadoForm.controls.nombre.setValue(this.empleado.nombre);
      if (this.empleado.apellidos != null) {
        this.empleadoForm.controls.apellidos.setValue(this.empleado.apellidos);
      }
      this.empleadoForm.controls.nif.setValue(this.empleado.nif);

      if (this.empleado.direccion != null) {
        this.empleadoForm.controls.direccion.setValue(this.empleado.direccion);
      }
      if (this.empleado.poblacion != null) {
        this.empleadoForm.controls.poblacion.setValue(this.empleado.poblacion);
      }
      if (this.empleado.codigopostal != null) {
        this.empleadoForm.controls.codPostal.setValue(this.empleado.codigopostal);
      }
      if (this.empleado.provincia != null) {
        this.empleadoForm.controls.provincia.setValue(this.empleado.provincia);
      }
      this.empleadoForm.controls.email.setValue(this.empleado.email);
      if (this.empleado.telefono != null) {
        this.empleadoForm.controls.telefono.setValue(this.empleado.telefono);
      }
      this.empleadoForm.controls.costeHora.setValue(this.empleado.coste_hora);
      this.empleadoForm.controls.costeHoraExtra.setValue(this.empleado.coste_hora_extra);
      this.empleadoForm.controls.uidTarjeta.setValue(this.empleado.uid_tarjeta);
      this.empleadoForm.controls.puestoUuid.setValue(this.empleado.puesto.id);
      this.empleadoForm.controls.horarioUuid.setValue(this.empleado.horario.id);
      this.empleadoForm.controls.assetUuid.setValue(this.empleado.asset == null ?
        this.assetDb.getUIDNotImage() : this.empleado.asset.id);
    }

  }

  cancelar() {
    this.ref.close(null);
  }

  guardar() {
    this.error = [];
    if (this.empleadoForm.controls.password.value != '') {
      if (this.empleadoForm.controls.password.value != this.empleadoForm.controls.password_confirmation.value ) {
        this.error.push('Los campos password y password_confirmation tienen que ser iguales.');
      }
    }
    if (this.validadorService.getFormValidationErrors(this.empleadoForm.controls).length > 0) {
      this.validadorService.getFormValidationErrors(this.empleadoForm.controls).forEach(error => {
        this.error.push(this.validadorService.getMensajeError(error));
      });
    } else {

      if (this.error.length == 0) {
        if (this.file == null) {
          this.datosEmpleado();
          this.ref.close({empleado: this.empleado, new: this.new});
        } else {
          this.assetDb.uploadFile(this.file).toPromise().then((img: Asset) => {
            this.datosEmpleado();
            this.empleado.asset_uuid = img.id;
            this.ref.close({empleado: this.empleado, new: this.new});
          })
        }
      }
    }
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

  private datosEmpleado () {
      this.empleado.nombre = this.empleadoForm.controls.nombre.value;
      this.empleado.apellidos = this.empleadoForm.controls.apellidos.value;
      this.empleado.nif = this.empleadoForm.controls.nif.value;
      this.empleado.direccion = this.empleadoForm.controls.direccion.value;
      this.empleado.poblacion = this.empleadoForm.controls.poblacion.value;
      this.empleado.codigopostal = this.empleadoForm.controls.codPostal.value;
      this.empleado.provincia = this.empleadoForm.controls.provincia.value;
      this.empleado.email = this.empleadoForm.controls.email.value;
      this.empleado.telefono = this.empleadoForm.controls.telefono.value;
      if (this.empleadoForm.controls.nombre.value != null && this.empleadoForm.controls.password_confirmation.value != null) {
        this.empleado.password = this.empleadoForm.controls.password.value;
        this.empleado.password_confirmation = this.empleadoForm.controls.password_confirmation.value;
      }
      this.empleado.uid_tarjeta = this.empleadoForm.controls.uidTarjeta.value;
      this.empleado.coste_hora = this.empleadoForm.controls.costeHora.value;
      this.empleado.coste_hora_extra = this.empleadoForm.controls.costeHoraExtra.value;
      this.empleado.puesto_uuid = this.empleadoForm.controls.puestoUuid.value;
      this.empleado.horario_uuid = this.empleadoForm.controls.horarioUuid.value;
      this.empleado.asset_uuid = this.empleadoForm.controls.assetUuid.value == '' ?
        this.assetDb.getUIDNotImage() : this.empleadoForm.controls.assetUuid.value;

  }

  private getPuestos(pagina: number) {
    this.puestosDb.getPuestos(pagina).then((res: any) => {
      this.metaPuestos = res['meta'][0];
      this.puestos = [...this.puestos, ...res[0]] ;
      if (this.metaPuestos.total_pages != this.metaPuestos.current_page) {
        this.getPuestos(this.metaPuestos.current_page + 1);
      }
    });
  }

  private getHorarios(pagina: number) {
    this.horarioDb.getHorarios(pagina).then((res:any) => {
      this.metaHorarios = res['meta'][0];
      this.horarios = [...this.horarios,...res[0]];
      if (this.metaHorarios.total_pages != this.metaHorarios.current_page) {
        this.getHorarios(this.metaHorarios.current_page + 1);
      }
    })
  }

}
