import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tt_web';
  // routes: boolean = true;
}