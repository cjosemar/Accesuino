import {Permission} from './permission.model';

export interface Role {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  permissions?: [Permission[]]
}

export interface RolePermiso {
  rol: string;
  permission: string;
}
