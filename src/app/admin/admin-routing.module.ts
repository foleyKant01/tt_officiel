import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdHomeComponent } from './ad-home/ad-home.component';

const routes: Routes = [
  { path:'', component: AdminComponent,
  children: [
    { path: '', redirectTo:'ad-home', pathMatch:'full' },
    { path:'ad-home', component: AdHomeComponent },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
