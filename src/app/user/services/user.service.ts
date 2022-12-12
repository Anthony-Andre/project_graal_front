import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDto } from '../dto/user-dto';
import { User } from '../models/user';

// @TODO: remove after wiring to backend
const users: UserDto[] = [
  {
    id: 1,
    login: 'admin',
    password: 'nimda'
  },
  {
    id: 2,
    login: 'guest',
    password: 'guest'
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;

  constructor() { }

  public login(formData: any): Observable<boolean> {
      const userIndex: number = users.findIndex((user: UserDto) =>
      user.login === formData.userLogin && user.password === formData.userPassword);
      if (userIndex === -1) {
        return of(false);
      } else { // so we got a user
        this._user = new User();
        this._user.id = users[userIndex].id!;
        this._user.login = users[userIndex].login;

        return of(true);
      }

    // Other way
    // let found: boolean = false;
    // for (const user of users) {
    //   if (user.login === formData.userLogin && user.password === formData. userPassword) {
    //     found = true;
    //     break; // = sortir de la boucle
    //   }
    // }
    // return of(found)
  }

  public logout(): void {}

  public hasUser(): boolean {
    return this._user !== null;
  }
}
