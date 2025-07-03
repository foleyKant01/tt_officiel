import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TellersService } from '../../services/tellers/tellers.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  teller_infos: any;
  infos_reports: any;
  most_visited_entities: any;
  t_uid: any;

  constructor(private http: TellersService){}

  ngOnInit(): void {
    const teller = sessionStorage.getItem('teller_infos');
    this.teller_infos = teller
    if (teller) {
      this.teller_infos = JSON.parse(teller); // Convertir en objet
      this.t_uid = this.teller_infos.t_uid
    }
    this.reportsTeller();
  }
  reportsTeller(): void {
    let body = {
      t_uid: this.t_uid
    }
    this.http.ReportsTeller(body).subscribe({
      next: (response: any) => {
        this.infos_reports = response;
        this.most_visited_entities = this.infos_reports.most_visited_entities;
        console.log(this.infos_reports);

      },
    })
  }

}
