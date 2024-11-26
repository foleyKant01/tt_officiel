import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TellersComponent } from './tellers.component';
import { CreateTellersComponent } from './create-tellers/create-tellers.component';
import { ReadallTellersComponent } from './readall-tellers/readall-tellers.component';
import { ReadsingleTellersComponent } from './readsingle-tellers/readsingle-tellers.component';
import { EditTellersComponent } from './edit-tellers/edit-tellers.component';

const routes: Routes = [
  { path:'', component:TellersComponent,
  children: [
    { path:'', redirectTo:'readall-tellers', pathMatch:'full' },
    { path:'readall-tellers', component:ReadallTellersComponent },
    { path:'create-tellers', component:CreateTellersComponent },
    { path:'readsingle-tellers/:t_uid', component:ReadsingleTellersComponent },
    { path:'edit-tellers/:t_uid', component:EditTellersComponent },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TellersRoutingModule { }
