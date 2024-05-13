import {Empleado} from './empleado.model';
import {TipoPermiso} from './tipo-permiso.model';

export interface Permiso {
  id?: string;
  observaciones?: string;
  inicio:  string;
  fin: string;
  empleado_uuid?: string;
  empleado: Empleado;
  tipopermisotrabajo_uuid?: string;
  tipopermisotrabajo: TipoPermiso
}
