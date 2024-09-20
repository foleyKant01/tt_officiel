import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdHomeComponent } from './ad-home/ad-home.component';
import { CreateCategoriesComponent } from '../categories/create-categories/create-categories.component';
import { ReadallCategoriesComponent } from '../categories/readall-categories/readall-categories.component';
import { CreateBusinessComponent } from '../business/create-business/create-business.component';
import { ReadallBusinessComponent } from '../business/readall-business/readall-business.component';
import { UpdateCategoriesComponent } from '../categories/update-categories/update-categories.component';
import { CreateAdverComponent } from '../advertisement/create-adver/create-adver.component';
import { ReadallAdverComponent } from '../advertisement/readall-adver/readall-adver.component';

const routes: Routes = [
  { path:'', component: AdminComponent,
  children: [
    { path: '', redirectTo:'ad-home', pathMatch:'full' },
    { path:'ad-home', component: AdHomeComponent },
    { path:'create-categories', component: CreateCategoriesComponent },
    { path:'readall-categories', component: ReadallCategoriesComponent },
    { path:'update-categories/:ca_uid/:name', component: UpdateCategoriesComponent },
    { path:'create-business', component: CreateBusinessComponent },
    { path:'readall-business', component: ReadallBusinessComponent },
    { path:'create-adver', component: CreateAdverComponent },
    { path:'readall-adver', component: ReadallAdverComponent },
    {path: 'settings',loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
