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
  public dateOfTheDay: string = new Date().getFullYear() + "," + (new Date().getMonth() + 1) + "," + (new Date().getDate() + 1);

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
      next: (response: HttpResponse<any>) => { },
      error: (error: any) => { },
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
    // const date: Date = new Date();
    // const diff: number = Math.floor(date.getTime() - poe.getEndDate().getTime());

    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate === "oneMonth" && (new Date(poe.getEndDate()) < new Date(this.dateOfTheDay))) {
      console.log("Date du jour: ", new Date());
      console.log("Date de la POE : ", poe.getEndDate());
      console.log(this.dateOfTheDay);

      return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 31 && this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) < 179;
    }
    if (this.stopDate === "sixMonth") {
      return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 180 && this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) < 364;
    }
    return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 365;
  }

  public getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

}





