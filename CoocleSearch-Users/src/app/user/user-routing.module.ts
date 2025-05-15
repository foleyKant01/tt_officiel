import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { FavorisComponent } from './favoris/favoris.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component: HomeComponent},
      {path: 'historiques', component: HistoriquesComponent},
      {path: 'favoris', component: FavorisComponent},
      {path: 'business', loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
