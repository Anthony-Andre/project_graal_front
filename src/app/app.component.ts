import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Suivi des POE';

  public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();

  public constructor(
    private stagiaireService: StagiaireService
  ) { }

  public toggleTitle(): void {
    if (this.title === 'Suivi des POE') {
      this.title = 'Hello Angular';
    } else {
      this.title = 'Suivi des POE';
    }
  }

  public addStagiaire(): void {
  }

}
