import { HttpClient } from '@angular/common/http';
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
}
