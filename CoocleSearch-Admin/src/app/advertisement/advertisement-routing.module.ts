import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from './advertisement.component';
import { CreateAdverComponent } from './create-adver/create-adver.component';
import { ReadallAdverComponent } from './readall-adver/readall-adver.component';

const routes: Routes = [
  { path:'', component:AdvertisementComponent,
  children: [
    { path:'', redirectTo:'create-adver', pathMatch:'full' },
    { path:'create-adver', component:CreateAdverComponent },
    { path:'readall-adver', component:ReadallAdverComponent },


  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
