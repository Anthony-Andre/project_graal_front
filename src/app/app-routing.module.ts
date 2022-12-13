import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homedir } from 'os';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { PoeTableComponent } from './core/poes/components/poe-table/poe-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { PoeFormComponent } from './core/poes/components/poe-form/poe-form.component';
import { PoeResolver } from './core/resolvers/poe.resolver';
import { LoginFormComponent } from './user/login/login-form/login-form.component';
import { NoUserGuard } from './user/guards/no-user.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login', // Redirection vers un autre chemin, ici 'login' 
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'home',
      component: PoeTableComponent
    },
    {
      path: 'poe',
      component: PoeTableComponent
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver }
    },
    {
      path: 'poe/add',
      component: PoeFormComponent,
      resolve: { form: PoeResolver }
    },
    {
      path: 'stagiaire',
      component: StagiaireTableComponent
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver }
    },
    {
      path: 'stagiaire/:id',
      component: StagiaireDetailComponent
    },
    {
      path: 'stagiaire/update/:id',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver }
    },
    {
      path: '**', // Wild card (Redirige vers le home si l'url n'existe pas) - Toujours mettre en dernier
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
}
