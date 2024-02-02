import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { TrouveztoutComponent } from './trouveztout/trouveztout.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { SearchresultComponent } from './searchresult/searchresult.component';


@NgModule({
  declarations: [
    UserComponent,
    TrouveztoutComponent,
    PubliciteComponent,
    SettingsComponent,
    SearchresultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
