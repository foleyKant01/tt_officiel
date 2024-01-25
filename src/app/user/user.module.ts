import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { TrouveztoutComponent } from './trouveztout/trouveztout.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    TrouveztoutComponent,
    PubliciteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
