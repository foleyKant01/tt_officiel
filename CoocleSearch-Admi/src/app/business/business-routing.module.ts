import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { ReadallBusinessComponent } from './readall-business/readall-business.component';
import { SpinnerComponent } from '../categories/spinner/spinner.component';

const routes: Routes = [
  { path:'', component:BusinessComponent,
  children: [
    { path:'', redirectTo:'create-business', pathMatch:'full' },
    { path:'create-business', component:CreateBusinessComponent },
    { path:'readall-business', component:ReadallBusinessComponent },
    { path:'spinner', component:SpinnerComponent },
    // { path:'register', component:RegisterComponent },
    // { path:'forgotpassword', component:ForgotpasswordComponent },
    // { path:'readsingle', component:ReadsingleComponent },

  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
