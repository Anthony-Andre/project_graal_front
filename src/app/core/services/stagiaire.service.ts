import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  private stagiaires: Array<Stagiaire> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/trainee`;

  constructor(
    private httpClient: HttpClient
  ) {
    // this.feedIt();
  }

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
            stagiaire.setLastName(inputStagiaire.lastname);
            stagiaire.setFirstName(inputStagiaire.firstname);
            stagiaire.setEmail(inputStagiaire.email);
            stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
            stagiaire.setBirthDate(new Date(inputStagiaire.birthdate));
            return stagiaire;
          })
        })
      )
  }

  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public delete(stagiaire: Stagiaire): void {
    // const stagiaireIndex: number = this.stagiaires.findIndex(
    //   (obj: Stagiaire) => obj.getId() === stagiaire.getId()
    // );
    // this.stagiaires.splice(stagiaireIndex, 1);

    // 1. call backend 
    this.httpClient.delete(`${this.controllerBaseUrl}/${stagiaire.getId()}`
    ).subscribe((res: any) =>
      console.log("delete ok")
    )
    // 2. adapt local list 
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

  public getStagiaireInitials(stagiaire: Stagiaire) {

  }

  // public getVisibleStagiaireNumber(date: Date | null): number {
  //   if (date === null) {
  //     return this.stagiaires.length;
  //   }

  //   return (date.getDate() === 31) ?
  //     this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
  //     this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length
  // }

  private feedIt(): void {
    let stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setId(1);
    stagiaire.setLastName('André');
    stagiaire.setFirstName('Anthony');
    stagiaire.setPhoneNumber('+(33)6 22 22 22 22');
    stagiaire.setEmail('anthony-andre@test.fr');
    stagiaire.setBirthDate(new Date(1992, 3, 28));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(2);
    stagiaire.setLastName('Stallone');
    stagiaire.setFirstName('Sylvester');
    stagiaire.setPhoneNumber('+(33)6 15 15 15 15');
    stagiaire.setEmail('sylvester-stallone@test.fr');
    stagiaire.setBirthDate(new Date(1981, 3, 30));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(3);
    stagiaire.setLastName('Norris');
    stagiaire.setFirstName('Chuck');
    stagiaire.setPhoneNumber('+(33)6 12 12 12 12');
    stagiaire.setEmail('chuck-norris@test.fr');
    stagiaire.setBirthDate(new Date(1961, 5, 27));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(4);
    stagiaire.setLastName('Cutugno');
    stagiaire.setFirstName('Toto');
    stagiaire.setPhoneNumber('+(33)6 58 58 58 58');
    stagiaire.setEmail('toto-cutugno@test.fr');
    stagiaire.setBirthDate(new Date(1949, 6, 4));

    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(5);
    stagiaire.setLastName('Apeupres');
    stagiaire.setFirstName('Jean-Michel');
    stagiaire.setPhoneNumber('+(33)6 85 85 85 85');
    stagiaire.setEmail('jean-michel-apeupres@test.fr');
    stagiaire.setBirthDate(new Date(1942, 6, 4));

    this.stagiaires.push(stagiaire);


  }
}
