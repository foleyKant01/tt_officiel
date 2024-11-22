import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'advertisement', loadChildren: () => import('./advertisement/advertisement.module').then(m => m.AdvertisementModule) },
      { path: 'business', loadChildren: () => import('./business/business.module').then(m => m.BusinessModule) },
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
