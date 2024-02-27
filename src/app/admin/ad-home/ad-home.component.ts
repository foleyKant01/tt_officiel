// import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js/auto';

// @Component({
//   selector: 'app-ad-home',
//   templateUrl: './ad-home.component.html',
//   styleUrls: ['./ad-home.component.scss']
// })
// export class AdHomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//     this.drawChart();
//   }

//   drawChart() {
//     const ctx = document.getElementById('trafficChart') as HTMLCanvasElement;
//     const myChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h',
//                  '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
//         datasets: [{
//           label: 'Nombre de recherches',
//           data: [10, 20, 15, 25, 30, 20, 35, 40, 45, 50, 60, 55, 70, 65, 75, 80, 90, 85, 95, 100, 110, 120, 115, 105],
//           fill: false,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-ad-home',
  templateUrl: './ad-home.component.html',
  styleUrls: ['./ad-home.component.scss']
})
export class AdHomeComponent implements OnInit {

  selectedDate: string = '';
  category: any;
  business: any;
  advertisement: any;
  searchCategories: string[] = [];
  searchBusiness: string[] = [];
  searchAdvertisement: string[] = [];
  data: any;

  constructor(private router: Router, private http: ApiService){}


  ngOnInit(): void {
    this.loadCategories();
    this.loadBusiness();
    this.drawChart();
  }

  // Get Categories

  loadCategories() {
    this.http.ReadAllCategories()?.subscribe({
      next: (response:any) =>{
        if(response?.categories)  {
          this.data = response?.categories
          this.searchCategories = this.data.map((category: any) => category?.name);
          console.log(this.searchCategories)
        }
      }
    });
  }

    // Get Business

    loadBusiness() {
      this.http.ReadAllBusiness()?.subscribe({
        next: (response:any) =>{
          this.data = response?.busi
          this.searchBusiness = this.data.map((business: any) => business?.name);
          console.log(this.searchBusiness)
        }
      });
    }

     // Get Advertisement

     loadAdvertisement() {
      this.http.ReadAllAdvertisement()?.subscribe({
        next: (response:any) =>{
          this.data = response?.adver
          this.searchBusiness = this.data.map((advertisement: any) => advertisement?.name);
          console.log(this.searchAdvertisement)
        }
      });
    }

  drawChart() {
    const ctx = document.getElementById('trafficChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h',
                 '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
        datasets: [{
          label: 'Nombre de recherches',
          data: [10, 20, 15, 25, 30, 20, 35, 40, 45, 50, 60, 55, 70, 65, 75, 80, 90, 85, 95, 100, 110, 120, 115, 105],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedDate = target.value;
    // Faites quelque chose avec la date sélectionnée
  }


  updateChart(selectedDate: string) {
    console.log('Selected Date:', selectedDate);
    // Ici, vous devriez mettre à jour les données du graphique en fonction de la date sélectionnée
    // Par exemple, vous pouvez charger les données de recherche de cette date à partir du backend
    // et mettre à jour le graphique avec ces données
  }
}
