import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://localhost:8080/';
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserSignedin());

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  signin(request: Request): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signin', request, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(map((resp) => {
      sessionStorage.setItem('user', request.userName);
      sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      this.hasUser$.next(true);
      console.log("login:", this.isUserSignedin());
      console.log("hasUser$", this.hasUser$.getValue())
      return resp;
    }));
  }

  signup(request: Request): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup', request, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json' }).pipe(map((resp) => {
      return resp;
    }));
  }

  signout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.hasUser$.next(false);
    console.log("logout: ", this.hasUser$.getValue())
    this.router.navigateByUrl('signin');
  }

  hasUser(): BehaviorSubject<boolean> {
    return this.hasUser$;
  }

  isUserSignedin() {
    return sessionStorage.getItem('token') !== null;
  }

  getSignedinUser() {
    return sessionStorage.getItem('user') as string;
  }

  getToken() {
    let token = sessionStorage.getItem('token') as string;
    return token;
  }

}