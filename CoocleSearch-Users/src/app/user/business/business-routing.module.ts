import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business.component';
import { ReadallBusinessComponent } from './readall-business/readall-business.component';
import { ReadsingleBusinessComponent } from './readsingle-business/readsingle-business.component';

const routes: Routes = [
  { path:'', component:BusinessComponent,
  children: [
    { path:'', redirectTo:'create-business', pathMatch:'full' },
    { path:'readall-business', component:ReadallBusinessComponent },
    { path:'readsingle-business/:bu_uid', component:ReadsingleBusinessComponent },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
