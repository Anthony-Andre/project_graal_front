import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {

  public poes: Array<Poe> = [];
  public stopDate: String | null = null;

  constructor(private poeService: PoeService) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    })
  }

  public onRemove(poe: Poe): void {
    console.log(`L'utilisateur souhaite supprimer ${poe.getTitle()}`);
  }

  public onUpDate(poe: Poe): void {
    console.log(`L'utilisateur souhaite modifier ${poe.getTitle()}`);
  }

  public filterChanged(event: String | null): void {
    console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
  }

  public changeView(poe: Poe): boolean {
    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate === "oneMonth") {
    }
    return false;





  }



}
