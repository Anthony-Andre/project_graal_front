import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { FormBuilderService } from 'src/app/core/poes/services/form-builder.service';
import { PoeService } from 'src/app/core/services/poe.service';

@Injectable({
  providedIn: 'root'
})
export class PoeResolver implements Resolve<FormGroup> {

  public constructor(
    private poeService: PoeService,
    private formBuilderService: FormBuilderService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    let poe: Poe;
    let form: FormGroup;

    if (id === 0) {
      poe = new Poe();
      form = this.formBuilderService.build(poe).getForm();
      return of(form);
    } else {
      return this.poeService.findOne(id)
      .pipe(
        take(1),
        map((oPoe: Poe) => {
          return this.formBuilderService.build(oPoe).getForm();
        })
      )
    }    
  }
}
