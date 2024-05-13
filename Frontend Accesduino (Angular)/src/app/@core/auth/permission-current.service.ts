import { Injectable } from '@angular/core';
import {Permission, User} from '../model';
import {StorageService} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PermissionCurrentService {

  userCurrent: User;
  permissions: [Permission[]];

  constructor(
    storageService: StorageService
  ) {
    this.userCurrent = storageService.getCurrentUser();
    this.permissions = this.userCurrent.roles[0][0].permissions;
  }

  comprobarPermiso(permiso: string): boolean {
    return this.permissions[0].filter( p => p.name == permiso).length == 1
  }

}
