import { Component, OnInit } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Suivi des POE';
  public hasUser: boolean = false;

  public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();

  public constructor(
    private stagiaireService: StagiaireService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.hasUser()
      .subscribe((hasUser: boolean) =>
        this.hasUser = hasUser)
  }

  public onLogout(): void {
    this.userService.logout();
  }

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
