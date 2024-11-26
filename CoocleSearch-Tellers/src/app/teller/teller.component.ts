import { Component } from '@angular/core';
import { HeaderComponent } from './include/header/header.component';
import { SidebarComponent } from './include/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teller',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './teller.component.html',
  styleUrl: './teller.component.scss'
})
export class TellerComponent {

}
