import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ReadallCategoriesComponent } from './readall-categories/readall-categories.component';

const routes: Routes = [
  { path:'', component:CategoriesComponent,
  children: [
    { path:'', redirectTo:'create-categories', pathMatch:'full' },
    { path:'create-categories', component:CategoriesComponent },
    { path:'readall-categories', component:ReadallCategoriesComponent },
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
export class CategoriesRoutingModule { }
