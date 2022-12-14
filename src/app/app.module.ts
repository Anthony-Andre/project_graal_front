import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { BubbleDirective } from './shared/directives/bubble.directive';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PoeFormComponent } from './core/poes/components/poe-form/poe-form.component';
import { PoeTableComponent } from './core/poes/components/poe-table/poe-table.component';
import { PoeFilterComponent } from './core/poes/components/poe-filter/poe-filter.component';
import { LoginFormComponent } from './user/login/login-form/login-form.component';
import { UserModule } from './user/user.module';
import { initializeApp } from './core/services/app-initializer.service';

@NgModule({
  declarations: [
    AppComponent,
    StagiaireTableComponent,
    StagiaireFilterComponent,
    InitialsPipe,
    StagiaireDetailComponent,
    BubbleDirective,
    StagiaireFormComponent,
    PoeFormComponent,
    PoeTableComponent,
    PoeFilterComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => initializeApp,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
