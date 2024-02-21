import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ReadsingleComponent } from './readsingle/readsingle.component';

const routes: Routes = [
  { path:'', component:AuthComponent,
  children: [
    { path:'', redirectTo:'register', pathMatch:'full' },
    { path:'register', component:RegisterComponent },
    { path:'login', component:LoginComponent },
    { path:'forgotpassword', component:ForgotpasswordComponent },
    { path:'readsingle', component:ReadsingleComponent },

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
