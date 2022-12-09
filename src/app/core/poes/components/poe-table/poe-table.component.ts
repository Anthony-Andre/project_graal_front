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

}
