import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { ReadsingleCategoriesComponent } from './readsingle-categories/readsingle-categories.component';
import { ReadallCategoriesComponent } from './readall-categories/readall-categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoriesComponent,
    ReadsingleCategoriesComponent,
    ReadallCategoriesComponent,
    UpdateCategoriesComponent,
    DeleteCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
