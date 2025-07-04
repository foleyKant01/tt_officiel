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
    this.getCurrentLocationAndAddress();

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


  getCurrentLocationAndAddress() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('Latitude:', lat, 'Longitude:', lon);
          // Appeler la fonction pour obtenir ville + commune
          this.getCityAndCommuneFromCoords(lat, lon).then(location => {
            sessionStorage.setItem('localisation', JSON.stringify(location));
            sessionStorage.setItem('coordonne', JSON.stringify(position.coords));
            console.log('localisation:', location);
            console.log('coordonne:', position.coords);
            console.log('Ville:', location.city);
            console.log('Commune:', location.commune);
          });
        },
        error => {
          console.error('Erreur de géolocalisation :', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error('La géolocalisation n’est pas prise en charge par ce navigateur.');
    }
  }


  getCityAndCommuneFromCoords(lat: number, lon: number): Promise<{ city?: string, commune?: string }> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    return fetch(url, {
      headers: {
        'User-Agent': 'CoocleSearch/1.0 (your@email.com)'
      }
    })
    .then(response => response.json())
    .then(data => {
      const address = data.address;
      return {
        infos_maps: address,
        commune: address
      };
    })
    .catch(error => {
      console.error('Erreur géocodage inverse :', error);
      return {};
    });
  }

}
