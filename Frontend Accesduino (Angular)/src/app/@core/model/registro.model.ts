import {Empleado} from './empleado.model';

export interface Registro {
  id?: string;
  inicio:  string;
  fin: string;
  duracion: string;
  control_terminado: boolean;
  empleado_uuid?: string;
  empleado: Empleado;
}
