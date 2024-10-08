import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { ReadallBusinessComponent } from './readall-business/readall-business.component';
import { ReadsingleBusinessComponent } from './readsingle-business/readsingle-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';
import { DeleteBusinessComponent } from './delete-business/delete-business.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    CreateBusinessComponent,
    ReadallBusinessComponent,
    ReadsingleBusinessComponent,
    UpdateBusinessComponent,
    DeleteBusinessComponent
  ],
  imports: [
    AppComponent,
    CommonModule,
    ReactiveFormsModule,
    BusinessRoutingModule
  ],
})
export class BusinessModule { }
