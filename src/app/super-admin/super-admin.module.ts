import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { SaHomeComponent } from './sa-home/sa-home.component';
import { AllAdminComponent } from './all-admin/all-admin.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuperAdminComponent,
    SaHomeComponent,
    AllAdminComponent,
    CreateadminComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
