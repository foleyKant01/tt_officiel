import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewSupervisorComponent } from './view-supervisor/view-supervisor.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: 'all-users', pathMatch: 'full' },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'view-supervisor/:user_id', component: ViewSupervisorComponent },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
