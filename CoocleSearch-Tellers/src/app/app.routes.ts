import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./teller/teller.module').then(m => m.TellerModule) },
  { path: '**', redirectTo: 'notfound' }
];
