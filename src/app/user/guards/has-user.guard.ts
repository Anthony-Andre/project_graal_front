import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class HasUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // If user : 
    // if (this.userService.hasUser().getValue()) {
    //   return true;
    // }

    if (this.authService.isUserSignedin()) {
      return true;
    }

    // If no user => Go to login
    this.router.navigate(['/', 'login']);
    return false;


  }

}
