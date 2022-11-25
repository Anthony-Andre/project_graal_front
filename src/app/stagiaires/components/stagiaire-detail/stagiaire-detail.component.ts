import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { appendFile } from 'fs';
import { emit } from 'process';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {

  @Input() stagiaire: Stagiaire | null = new Stagiaire();
  // @Output() public changeVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  // @Output() public onChangeState: EventEmitter<Stagiaire | null> = new EventEmitter<Stagiaire | null>();

  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }

  constructor(
    private handleDetailService: HandleDetailService
  ) { }

  ngOnInit(): void {
  }

  public changeStagiaire(stagiaire: Stagiaire) {
    this.stagiaire = stagiaire;
  }

  public closeStagiaireCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

}
