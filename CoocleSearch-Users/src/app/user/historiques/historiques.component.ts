import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HistoriquesService } from '../services/users/historiques.service';

@Component({
  selector: 'app-historiques',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.scss'
})

export class HistoriquesComponent implements OnInit{

  constructor(private router: Router, private http: HistoriquesService) { }

  title = 'Historiques';



  ngOnInit(): void {


}
}
