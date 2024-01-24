import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsHomeComponent } from './us-home/us-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    UserComponent,
    UsHomeComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
