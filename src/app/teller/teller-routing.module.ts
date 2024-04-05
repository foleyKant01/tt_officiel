import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TellerComponent } from './teller.component';
import { HomeComponent } from './home/home.component';
import { RegisterOrdersComponent } from './register_orders/register-orders.component';

const routes: Routes = [
  { path:'', component: TellerComponent,
  children: [
    { path: '', redirectTo:'auth', pathMatch:'full' },
    {path: 'auth',loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
    { path:'home', component:HomeComponent },
    { path:'register_orders', component:RegisterOrdersComponent },

  ]
}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TellerRoutingModule { }
