import { Routes } from '@angular/router';
import { authguardGuard } from './guard/authguard.guard';
import { adminguardGuard } from './guard/adminguard.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth',  canActivate: [authguardGuard],loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'admin', canActivate: [adminguardGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: '**', redirectTo: 'notfound' }
  ];
