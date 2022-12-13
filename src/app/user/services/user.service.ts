import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
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
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _storageStrategy!: IStorageStrategy;


  constructor(
    private router: Router
  ) { }

  public login(formData: any): Observable<boolean> {
      const userIndex: number = users.findIndex((user: UserDto) =>
      user.login === formData.userLogin && user.password === formData.userPassword);
      if (userIndex === -1) {
        this.hasUser$.next(false); // Notify subscribers of a new value
        return of(false);
      } else { // so we got an user
        this._user = new User();
        this._user.id = users[userIndex].id!;
        this._user.login = users[userIndex].login;

        // Get the strategy to use to store
        if(formData.stayConnected) {
          this._storageStrategy = new LocalStrategy;
        } else {
          this._storageStrategy = new SessionStrategy;
        }

        // Store the user object locally
        this._storageStrategy.storeItem('auth', JSON.stringify(this._user));

        this.hasUser$.next(true);

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

  public logout(): void {
    this._user = null;
    this.router.navigate(['/', 'login']);
    this.hasUser$.next(false);
  }

  public hasUser(): BehaviorSubject<boolean> {
    return this.hasUser$;
  }
}
