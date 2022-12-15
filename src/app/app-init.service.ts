import { Injectable } from '@angular/core';
import { LocalStrategy } from './core/strategies/storage/local-strategy';
import { UserService } from './user/services/user.service';

@Injectable()
export class AppInitService {

  constructor(
    // private localStrategy: LocalStrategy,
    private _userService: UserService
  ) {
  }

  public init(): Promise<void> {
    return new Promise<any>((resolve: any) => {
      const hasUser$ = this._userService.hasUser();
      resolve()
    })
  }


}

export const initializeApp = (appInitService: AppInitService): any => {
  return (): Promise<void> => {
    return appInitService.init();
  }

  // Init() {

  //   return new Promise<void>((resolve, reject) => {
  //     // console.log(this.localStrategy.getItem('auth'));
  //     // if (this.localStrategy.getItem('auth')) {
  //     //   console.log("login:", this.localStrategy.getItem('auth'));
  //     //   // this.userService.loggedUser(this.localStrategy.getItem('auth')[0], this.localStrategy.getItem('auth')[1])
  //     //   console.log("Il y a un utilisateur d'enregistré dans le local Storage")
  //     // } else {
  //     //   console.log("Il n'y a pas d'utilisateur enregistré dans le local Storage");
  //     // }
  //     // this.userService.readStorage();

  //     resolve();
  //   });
  // }
}