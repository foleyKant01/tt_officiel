import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateBusinessComponent } from './business/create-business/create-business.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./super-admin/super-admin.module').then((m) => m.SuperAdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: 'advertisement',
    loadChildren: () => import('./advertisement/advertisement.module').then((m) => m.AdvertisementModule)
  },
  {
    path: 'teller',
    loadChildren: () => import('./teller/teller.module').then((m) => m.TellerModule)
  },
  { path: 'create-business', component: CreateBusinessComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
