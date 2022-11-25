import { Component, OnInit } from '@angular/core';
import { appendFile } from 'fs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = new Date(1990, 11, 31);
  public stagiairesBeforeStopDate: Array<Stagiaire> = this.stagiaireService.getStagiaireBornBefore(this.stopDate);
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
    private handleDetailService: HandleDetailService
  ) { }

  ngOnInit(): void {
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      this.stagiaires = stagiaires;
    })
    this.isDetailHidden$ = this.handleDetailService.isDetailHidden;
  }

  public onRemove(stagiaire: Stagiaire): void {
    console.log(`L'utilisateur souhaite supprimer ${stagiaire.getLastName()}`);
    this.stagiaireService.delete(stagiaire);
  }

  public onClick(stagiaire: Stagiaire): void {
    this.selectedStagiaire = stagiaire;
    this.handleDetailService.setIsDetailHidden(false);
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

  public showStagiaire(stagiaire: Stagiaire) {
    if (this.visibility === true) {
      this.stagiaire = stagiaire;
      this.visibility = false;
    }
  }

  public closeStagiaireCard(hiddenStatus: Boolean): void {
    this.visibility = hiddenStatus;
  }

}