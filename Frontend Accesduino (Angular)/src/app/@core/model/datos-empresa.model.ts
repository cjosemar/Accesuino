import {Asset} from './asset.model';

export interface DatosEmpresa {
  id: string;
  nombre: string;
  direccion?: string;
  poblacion?: string;
  codigopostal?: string;
  provincia?: string;
  email: string;
  telefono?: string;
  asset: Asset;
  asset_uuid?: string;
}
