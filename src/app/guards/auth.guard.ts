import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return true;
  }
  
}
