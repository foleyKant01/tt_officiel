import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { SaHomeComponent } from './sa-home/sa-home.component';
import { AllAdminComponent } from './all-admin/all-admin.component';

const routes: Routes = [
  { path:'', component: SuperAdminComponent,
  children: [
    { path:'', redirectTo: 'sa-home', pathMatch:'full' },
    { path:'sa-home', component: SaHomeComponent },
    { path:'all-admin', component: AllAdminComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
