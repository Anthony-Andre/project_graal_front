import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class NoUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private route: Router,
    private authService: AuthService
  ) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Use service method hasUser()  

    if (this.authService.isUserSignedin()) {
      this.route.navigate(['/', 'home']);
      return false; // La route ne doit pas être activée
    }
    return true;
  }



}

