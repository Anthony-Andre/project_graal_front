import { PoeType } from "../enums/poe-type";

export class Poe {
    private id: number = 0;
    private title: string = "";
    private beginDate!: Date;
    private endDate!: Date;
    private poeType!: PoeType;


    public getId(): number {
        return this.id;
    }
    
    public setId(id: number): void {
        this.id = id;
    }

    public getBeginDate(): Date {
        return this.beginDate;
    }

    public setBirthDate(beginDate: Date): void {
        this.beginDate = beginDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getPoeType(): PoeType {
        return this.poeType;
    }

    public setPoeType(poeType: PoeType): void {
        this.poeType = poeType;
    }
}

