import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// @TODO: remove after wiring to backend
const users: any[] = [
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

  constructor() { }

  public login(formData: any): Observable<boolean> {
    return of(
      users.findIndex((user: any) => {
        return user.login === formData.userLogin && user.password === formData.userPassword
      }) !== -1
    )

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
}
