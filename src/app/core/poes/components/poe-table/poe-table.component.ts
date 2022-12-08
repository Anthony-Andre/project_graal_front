import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {
  
    ELEMENT_DATA: any = [
      
    ];
    constructor() { }
  
  
  
   ngOnInit(): void {

    }
  
  
  
   displayedColumns: string[] = ['Type_POE', 'Date_Start', 'Date_End', 'Title_POE'];
    dataSource = this.ELEMENT_DATA;
  
  
  
  }

}
