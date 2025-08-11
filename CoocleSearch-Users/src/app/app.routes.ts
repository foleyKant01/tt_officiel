import { Routes } from '@angular/router';
import { authguardGuard } from './guard/authguard.guard';
import { userguardGuard } from './guard/userguard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user',canActivate: [userguardGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'auth',canActivate: [authguardGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

];
