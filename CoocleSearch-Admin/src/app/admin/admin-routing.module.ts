import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AttendenceComponent } from './attendence/attendence.component';

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
      { path: 'attendance', component: AttendenceComponent },
      { path: 'settings', component: SettingsComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
