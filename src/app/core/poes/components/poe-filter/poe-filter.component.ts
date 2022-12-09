import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poe-filter',
  templateUrl: './poe-filter.component.html',
  styleUrls: ['./poe-filter.component.scss']
})
export class PoeFilterComponent implements OnInit {

  @Input() filterDate: String | null = null;
  @Output() public onChangeFilter: EventEmitter<String | null> = new EventEmitter<String | null>();

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  ngOnInit(): void {
    this.buttonMap.set('btnAll', true);
    this.buttonMap.set('btnOneMonth', false);
    this.buttonMap.set('btnSixMonth', false);
    this.buttonMap.set('btnOneYear', false);

    if (this.filterDate === null) {
      this.changeButtonState('btnAll');
    } else {
      if (this.filterDate === "oneMonth") {
        this.changeButtonState('btnOneMonth');
      } else {
        if (this.filterDate === "sixMonth") {
          this.changeButtonState('btnSixMonth');
        } else {
          this.changeButtonState('btnOneYear');
        }
      }
    }
  }

  public getButtonState(key: string): boolean {
    return this.buttonMap.get(key)!;
  }

  public changeButtonState(button: string): void {
    this.buttonMap.forEach((value: Boolean, key: string) => {
      if (key === button) {
        this.buttonMap.set(key, true);
      } else {
        this.buttonMap.set(key, false);
      }
    });

    if (button === 'btnAll') {
      this.onChangeFilter.emit(null);
    } else if (button === 'btnOneMonth') {
      this.onChangeFilter.emit('oneMonth');
    } else if (button === 'btnSixMonth') {
      this.onChangeFilter.emit('sixMonth');
    } else {
      this.onChangeFilter.emit('oneYear');
    }

  }
}
