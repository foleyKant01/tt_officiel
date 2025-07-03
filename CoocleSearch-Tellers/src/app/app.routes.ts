import { Routes } from '@angular/router';
import { guardauthGuard } from './guard/guardauth.guard';
import { tellerGuard } from './guard/teller.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', canActivate: [guardauthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'teller',canActivate: [tellerGuard],  loadChildren: () => import('./teller/teller.module').then(m => m.TellerModule) },
  { path: '**', redirectTo: 'notfound' }
];
