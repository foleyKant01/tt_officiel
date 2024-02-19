import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { ReadsingleCategoriesComponent } from './readsingle-categories/readsingle-categories.component';
import { ReadallCategoriesComponent } from './readall-categories/readall-categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoriesComponent,
    ReadsingleCategoriesComponent,
    ReadallCategoriesComponent,
    UpdateCategoriesComponent,
    DeleteCategoriesComponent,
    SpinnerComponent,

  ],
  imports: [
    AppComponent,
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
