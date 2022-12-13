import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class NoUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private route: Router
  ) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Use service method hasUser()  

    if (this.userService.hasUser().getValue()) {
      this.route.navigate(['/', 'home']);
      return false; // La route ne doit pas être activée
    }
    return true;
  }



}

