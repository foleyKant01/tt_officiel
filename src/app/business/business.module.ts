import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { ReadallBusinessComponent } from './readall-business/readall-business.component';
import { ReadsingleBusinessComponent } from './readsingle-business/readsingle-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';
import { DeleteBusinessComponent } from './delete-business/delete-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateBusinessComponent,
    ReadallBusinessComponent,
    ReadsingleBusinessComponent,
    UpdateBusinessComponent,
    DeleteBusinessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusinessRoutingModule
  ]
})
export class BusinessModule { }
