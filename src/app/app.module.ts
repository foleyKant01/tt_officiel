import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from'@angular/common/http';

import { NotfoundComponent } from './notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    // RouterModule.forRoot({routes:Router})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
