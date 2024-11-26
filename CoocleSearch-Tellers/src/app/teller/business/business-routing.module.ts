import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { ReadallBusinessComponent } from './readall-business/readall-business.component';
import { ReadsingleBusinessComponent } from './readsingle-business/readsingle-business.component';
import { DeleteBusinessComponent } from './delete-business/delete-business.component';

const routes: Routes = [
  { path:'', component:BusinessComponent,
  children: [
    { path:'', redirectTo:'create-business', pathMatch:'full' },
    { path:'create-business', component:CreateBusinessComponent },
    { path:'readall-business', component:ReadallBusinessComponent },
    { path:'edit-business/:bu_uid', component:ReadsingleBusinessComponent },
    { path:'delete-business/:bu_uid', component:DeleteBusinessComponent },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
