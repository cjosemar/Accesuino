import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import "rxjs-compat/add/observable/of"
import {Token, User} from '../model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static readonly TOKEN_KEY = 'token';
  private static readonly CURRENT_USER_KEY = 'currentUser';

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  getStorage(): Storage {
    return this.storage;
  }

  getToken(): Token {
    if (this.storage.getItem(StorageService.TOKEN_KEY)) {
      return JSON.parse(this.storage.getItem(StorageService.TOKEN_KEY));
    };
  }

  setToken(token: Token): StorageService {
    this.storage.setItem(StorageService.TOKEN_KEY, JSON.stringify(token));
    return this;
  }

  removeToken(): StorageService {
    this.storage.removeItem(StorageService.TOKEN_KEY);
    return this;
  }

  getCurrentUser(): User {
    if (this.storage.getItem(StorageService.CURRENT_USER_KEY)) {
      return JSON.parse(this.storage.getItem(StorageService.CURRENT_USER_KEY));
    };
  }

  setCurrentUser(user: User): StorageService {
    this.storage.setItem(StorageService.CURRENT_USER_KEY, JSON.stringify(user));
    return this;
  }

  removeCurrentUser(): StorageService {
    this.storage.removeItem(StorageService.CURRENT_USER_KEY);
    return this;
  }

  resetStorage(): StorageService {
    this.storage.clear();
    return this;
  }

}
