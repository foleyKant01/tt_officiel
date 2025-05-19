import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../include/header/header.component';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.scss'
})
export class FavorisComponent {

}
