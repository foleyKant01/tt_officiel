import { Component } from '@angular/core';
import { HeaderComponent } from "./include/header/header.component";
import { SidebarComponent } from "./include/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
