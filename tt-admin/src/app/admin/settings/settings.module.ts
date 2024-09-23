import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ProfilComponent } from './profil/profil.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ProfilComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
