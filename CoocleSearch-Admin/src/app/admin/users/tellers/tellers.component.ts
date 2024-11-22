import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tellers',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './tellers.component.html',
  styleUrl: './tellers.component.scss'
})
export class TellersComponent {

}
