import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { TellersModule } from './tellers/tellers.module';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  { path:'', component:UsersComponent,
  children: [
    { path: 'tellers', loadChildren: () => import('./tellers/tellers.module').then(m => m.TellersModule) },
    { path:'all-users', component:AllUsersComponent },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
