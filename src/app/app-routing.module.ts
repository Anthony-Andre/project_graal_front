import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homedir } from 'os';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'home', // Redirection vers un autre chemin, ici 'home' 
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: StagiaireTableComponent
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent
    },
    {
      path: 'stagiaire/:id',
      component: StagiaireDetailComponent
    },
    {
      path: 'stagiaire/update/:id',
      component: StagiaireFormComponent
    },
    {
      path: '**', // Wild card (Redirige vers le home si l'url n'existe pas) - Toujours mettre en dernier
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
}
