import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UsHomeComponent } from './us-home/us-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path:'', component: UserComponent,
  children: [
    { path:'', redirectTo:'us-home', pathMatch:'full' },
    { path:'us-home', component: UsHomeComponent },
    { path:'sidebar', component: SidebarComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
