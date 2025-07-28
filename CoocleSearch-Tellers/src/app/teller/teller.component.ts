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
  private _sidebarOpen = false;

  closeSidebar() {
    if (this.sidebarOpen === true) {
      this.sidebarOpen = false;
    }
  }

  get sidebarOpen() {
    return this._sidebarOpen;
  }

  set sidebarOpen(value: boolean) {
    this._sidebarOpen = value;
    console.log('sidebarOpen:', value);
  }

}
