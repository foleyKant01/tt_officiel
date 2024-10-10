import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule)},
  { path: 'advertisement', loadChildren: () => import('./advertisement/advertisement.module').then((m) => m.AdvertisementModule)},
  { path: 'business', loadChildren: () => import('./business/business.module').then((m) => m.BusinessModule)},
  { path: '**', component: NotfoundComponent }

];
