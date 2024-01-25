import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { SaHomeComponent } from './sa-home/sa-home.component';
import { AllAdminComponent } from './all-admin/all-admin.component';


@NgModule({
  declarations: [
    SuperAdminComponent,
    SaHomeComponent,
    AllAdminComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
