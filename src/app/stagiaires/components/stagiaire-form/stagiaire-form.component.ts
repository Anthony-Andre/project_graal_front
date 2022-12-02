import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {


  stagiaire: Stagiaire = new Stagiaire();

  stagiaireForm!: FormGroup;

  dateFormat: string = 'FR-fr';

  constructor(
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stagiaireForm = this.formBuilderService.build().getForm();
  }


  /**
   * Returns a list of form controls
   * @usage In template : c['lastname']
   * instead of stagiaireForm.controls['lastname'];
   */

  public get c(): { [key: string]: AbstractControl } {
    return this.stagiaireForm.controls;
  }

  onSubmit() {
    console.log('Delegate add stagiaire: ', this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
    this.stagiaireService.addStagiaire(dto)
      .subscribe(() => this.goHome());
  }

  public goHome(): void {
    this.router.navigate(['/', 'home'])
  }

}


