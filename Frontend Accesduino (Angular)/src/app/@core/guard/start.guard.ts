import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserCurrentService} from '../auth';

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private userCurrentService: UserCurrentService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canLoad()
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userCurrentService.isLoggeddIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
