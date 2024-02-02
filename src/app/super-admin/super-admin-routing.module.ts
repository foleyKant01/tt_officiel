import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { SaHomeComponent } from './sa-home/sa-home.component';
import { AllAdminComponent } from './all-admin/all-admin.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { SettingsComponent } from '../user/settings/settings.component';

const routes: Routes = [
  { path:'', component: SuperAdminComponent,
  children: [
    { path:'', redirectTo: 'sa-home', pathMatch:'full' },
    { path:'sa-home', component: SaHomeComponent },
    { path:'all-admin', component: AllAdminComponent },
    { path:'createadmin', component: CreateadminComponent },
    { path:'settings', component: SettingsComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
