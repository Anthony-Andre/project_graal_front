import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';
import { Observable, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StagiaireDetailComponent } from 'src/app/stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  private stagiaires: Array<Stagiaire> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/trainee`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // Récupérer tous les stagiaire : 

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((stagiaires: any[]) => {
          return stagiaires.map((inputStagiaire: any) => {
            const stagiaire: Stagiaire = new Stagiaire();
            stagiaire.setId(inputStagiaire.id);
            stagiaire.setLastName(inputStagiaire.lastName);
            stagiaire.setFirstName(inputStagiaire.firstName);
            stagiaire.setEmail(inputStagiaire.email);
            stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
            stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
            console.log(stagiaire);
            return stagiaire;
          })
        })
      )
  }

  // Recherche d'un stagiaire par ID : 

  public findOne(id: number): Observable<Stagiaire> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputStagiaire: any) => {
        const stagiaire: Stagiaire = new Stagiaire();
        stagiaire.setId(inputStagiaire.id);
        stagiaire.setLastName(inputStagiaire.lastName);
        stagiaire.setFirstName(inputStagiaire.firstName);
        stagiaire.setEmail(inputStagiaire.email);
        stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
        stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
        console.log(stagiaire);
        return stagiaire;
      })
    )
  }

  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public addStagiaire(stagiaire: StagiaireDto): Observable<Stagiaire> {
    console.log('add stagiaire asked: ', stagiaire)
    // Transform any to Stagiaire
    return this.httpClient.post<StagiaireDto>(
      this.controllerBaseUrl,
      stagiaire
    )
      .pipe(
        take(1),
        map((stagiaireDto: StagiaireDto) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(stagiaireDto.id!);
          stagiaire.setLastName(stagiaireDto.lastname);
          stagiaire.setFirstName(stagiaireDto.firstname);
          stagiaire.setEmail(stagiaireDto.email);
          stagiaire.setPhoneNumber(stagiaireDto.phoneNumber);
          stagiaire.setBirthDate(stagiaireDto.birthdate);
          return stagiaire;
        })
      );
  }

  public delete(stagiaire: Stagiaire): Observable<HttpResponse<any>> {
    // 1. call backend
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${stagiaire.getId()}`,
      {
        observe: 'response'
      }
    );
  }

  public getStagiaireBornBefore(date: Date | null): Array<Stagiaire> {
    if (date === null) {
      return this.stagiaires;
    }
    // else {
    //   return this.stagiaires.filter((stagiaire: Stagiaire) => stagiaire.getBirthDate() < date);
    // }
    return (date.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date) :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date)
  }

  public getVisibleStagiaireNumber(date: Date | null): number {
    if (date === null) {
      return this.stagiaires.length;
    }
    return (date.getDate() === 31) ?
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length;
  }



}
