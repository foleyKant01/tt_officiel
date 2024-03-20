import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdHomeComponent } from './ad-home/ad-home.component';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { FooterComponent } from './includes/footer/footer.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdHomeComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
