import {Puesto} from './puesto.model';
import {Horario} from './horario.model';
import {Asset} from './asset.model';

export interface Empleado {
  id?: string;
  nombre: string;
  apellidos?: string;
  nif: string;
  direccion?: string;
  poblacion?: string;
  codigopostal?: string;
  provincia?: string;
  email: string;
  telefono?: string;
  password?: string;
  password_confirmation?: string;
  coste_hora: number;
  coste_hora_extra: number;
  uid_tarjeta: string;
  puesto_uuid?: string;
  puesto: Puesto;
  horario_uuid?: string;
  horario: Horario;
  asset_uuid?: string;
  asset: Asset;
}
