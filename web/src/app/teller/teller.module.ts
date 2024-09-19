import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TellerRoutingModule } from './teller-routing.module';
import { TellerComponent } from './teller.component';
import { HomeComponent } from './home/home.component';
import { RegisterOrdersComponent } from './register_orders/register-orders.component';


@NgModule({
  declarations: [
    TellerComponent,
    HomeComponent,
    RegisterOrdersComponent
  ],
  imports: [
    CommonModule,
    TellerRoutingModule
  ]
})
export class TellerModule { }
