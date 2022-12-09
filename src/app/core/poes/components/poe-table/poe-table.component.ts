import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private poeService: PoeService,
    private router: Router) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    })
  }

  public onRemove(poe: Poe): void {
    console.log(`L'utilisateur souhaite supprimer ${poe.getTitle()}`);
    this.poeService.delete(poe).subscribe({
      next: (response: HttpResponse<any>) => {},
      error: (error: any) => {},
      complete: () => {
        this.poes.splice(
          this.poes.findIndex((p: Poe) => p.getId() === poe.getId()),
          1
        )
      }
    });
  }

  public onUpDate(poe: Poe): void {
    console.log(`L'utilisateur souhaite modifier ${poe.getTitle()}`);
    this.router.navigate(['/', 'poe', 'update', poe.getId()]);
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
