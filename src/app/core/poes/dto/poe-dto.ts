import { Poe } from "src/app/core/models/poe";
import { PoeType } from "../../enums/poe-type";

export class PoeDto {
  // Changegit
  public id?: number;
  public title: string = '';
  public beginDate!: Date;   
  public endDate!: Date;
  public type! : PoeType;

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}