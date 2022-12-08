import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poe } from '../models/poe';


@Injectable({
  providedIn: 'root'
})
export class PoeService {

  private poes: Array<Poe> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/poe`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((poes: any[]) => {
          return poes.map((inputPoe: any) => {
            const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setBeginDate(inputPoe.beginDate);
            poe.setEndDate(inputPoe.endDate);
            poe.setPoeType(inputPoe.poeType);
            return poe;
          })
        })
      )
  }

<<<<<<< HEAD
  public delete(poe: Poe): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${poe.getId()}`,
      {
        observe: 'response'
      }
    );
  }

=======
  public update(poe: Poe): Observable<Poe> {
    return this.httpClient.put<Poe>(
      `${this.controllerBaseUrl}`,
      poe
    )
      .pipe(
        take(1),
        map((anyPoe: any) => {
          const stagiaire: Poe = new Poe();
          poe.setId(anyPoe.id!);
          poe.setTitle(anyPoe.title);
          poe.setBeginDate(anyPoe.beginDate);
          poe.setEndDate(anyPoe.endDate);
          poe.setPoeType(anyPoe.poeType);          
          return stagiaire;
        })
      )
  }
>>>>>>> 5fb27b4b54c43f2cd6b5fc0b47b0e2f41b35705a
}
