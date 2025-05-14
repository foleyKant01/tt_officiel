import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { FavorisComponent } from './favoris/favoris.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path: 'home', component: HomeComponent},
  {path: 'favoris', component: FavorisComponent},
  {path: 'historiques', component: HistoriquesComponent},
];
