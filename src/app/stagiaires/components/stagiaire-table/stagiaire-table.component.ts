import { Component, OnInit } from '@angular/core';
import { appendFile } from 'fs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = new Date(1990, 11, 31);
  public stagiairesBeforeStopDate: Number = this.stagiaireService.getVisibleStagiaireNumber(this.stopDate);
  public stagiaire: Stagiaire | null = null;
  public visibility: Boolean = true;
  public bubbleConfig: any = {
    height: '2.5em',
    width: '2.5em',
    lineHeight: '2.5em', // Equivalent line-height en CSS
    backgroundColor: 'rgba(189, 75, 22, 0.651)',
    color: '#fff',
    borderRadius: '50%',
    border: 'solid 2px #fff',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }
  public isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public selectedStagiaire: Stagiaire | null = null;

  constructor(
    private stagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      this.stagiaires = stagiaires;
    })
    this.isDetailHidden$ = this.handleDetailService.isDetailHidden;
  }

  public onRemove(stagiaire: Stagiaire): void {
    console.log(`L'utilisateur souhaite supprimer ${stagiaire.getLastName()}`);
    this.stagiaireService.delete(stagiaire)
      .subscribe({
        next: (response: HttpResponse<any>) => {

          // Here goes the snackbar
        },
        error: (error: any) => {
          // Something went wrong, deal with it
        },
        complete: () => {
          this.stagiaires.splice(
            this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
            1
          )
        }
      })
  }

  public onClick(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()])
  }

  public onUpdate(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', 'update', stagiaire.getId()])
  }

  public filterChanged(event: Date | null): void {
    // console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
    // this.stagiairesBeforeStopDate = this.stagiaireService.getStagiaireBornBefore(this.stopDate)
  }

  public changeView(stagiaire: Stagiaire): boolean {
    if (this.stopDate === null) {
      return true;
    }

    if (this.stopDate.getDate() === 31) {
      return stagiaire.getBirthDate() > this.stopDate;

    }
    return stagiaire.getBirthDate() < this.stopDate;
  }

  // public showStagiaire(stagiaire: Stagiaire) {
  //   if (this.visibility === true) {
  //     this.stagiaire = stagiaire;
  //     this.visibility = false;
  //   }
  // }

  public closeStagiaireCard(hiddenStatus: Boolean): void {
    this.visibility = hiddenStatus;
  }

  public getVisibleStagiaire(): number {
    return this.stagiaireService.getVisibleStagiaireNumber(
      this.stopDate);
  }

}