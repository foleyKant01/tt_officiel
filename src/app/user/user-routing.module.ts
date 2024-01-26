import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { TrouveztoutComponent } from './trouveztout/trouveztout.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path:'', component: UserComponent,
  children: [
    { path:'', redirectTo:'trouveztout', pathMatch:'full' },
    { path:'trouveztout', component: TrouveztoutComponent },
    { path:'publicite', component: PubliciteComponent },
    { path:'settings', component: SettingsComponent },

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
