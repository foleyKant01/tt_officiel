import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ProfilComponent } from './profil/profil.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path:'', component: SettingsComponent,
  children: [
    { path: '', redirectTo:'profil', pathMatch:'full' },
    { path:'profil', component: ProfilComponent },
    { path:'password', component: PasswordComponent },
  ]
}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
