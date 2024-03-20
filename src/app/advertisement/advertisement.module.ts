import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementComponent } from './advertisement.component';
import { CreateAdverComponent } from './create-adver/create-adver.component';
import { ReadallAdverComponent } from './readall-adver/readall-adver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    AdvertisementComponent,
    CreateAdverComponent,
    ReadallAdverComponent
  ],
  imports: [
    AppComponent,
    CommonModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdvertisementModule { }
