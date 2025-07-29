import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../services/users/business.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  All_business: any;
  user_id: any;
  coordonne: any;
  localisation: any;

  constructor(private router: Router, private http: BusinessService) { }

  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  profileMenuVisible = false;
  user_infos: any
  isLoggedIn: boolean = false;
  businessList: any[] = [];
  searchDone = false;
  backToTopBtnVisible = false;
  loading = false;


  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('businessList');
    sessionStorage.removeItem('user_infos');
    this.router.navigate(['/auth/login']);
  }

  Searchbusiness() {
    this.loading = true;
    const searchText = this.search_form.get('textSearch')?.value.trim();
    if (!searchText) return;
    const payload = {
      textSearch: searchText,
      user_id: this.user_id,
      latitude: this.coordonne.latitude,
      longitude: this.coordonne.longitude
    };
    this.http.SearchBusinessByCategorie(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);

        if (reponse?.status === 'success' && Array.isArray(reponse.business)) {
          setTimeout(() => {
            this.loading = false;
            this.All_business = reponse.business;
            this.searchDone = true;
          }, 2000);
          if (reponse.business) {
            sessionStorage.setItem('All_business', JSON.stringify(reponse.business));
            sessionStorage.setItem('businessList', JSON.stringify(reponse.business));
            sessionStorage.setItem('textSearch', JSON.stringify(reponse.textSearch));
          }
        }
        else {
          this.All_business = [];
          sessionStorage.setItem('All_business', JSON.stringify(this.All_business));
          sessionStorage.setItem('textSearch', JSON.stringify(reponse.textSearch));
          this.loading = false;
          this.searchDone = true;
        }
        this.router.navigate(['/user/home']);

      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.searchDone = true;
        this.All_business = [];
        if (err.error instanceof ProgressEvent) {
          console.log('Erreur liée à un mauvais format JSON ou content-type.');
        } else {
          console.log('Réponse du serveur :', err.error);
        }
      }
    });
    this.createStats()
  }

  createStats(): void {
    const searchText = this.search_form.get('textSearch')?.value.trim();
    if (!searchText) return;
    let body = {
      textSearch: searchText,
      all_business_found: this.All_business,
      city: this.localisation.city,
      commune: this.localisation.commune,
      longitude: this.coordonne.longitude,
      latitude: this.coordonne.latitude
    }
    this.http.CreateStats(body).subscribe({
      next: (response: any) => {
        if (response?.status === 'success') {
          console.log('message: ', response.message);
        }
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      }
    });
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user_infos');
    this.isLoggedIn = !!user;
    this.user_infos = user

    const datalocalisation = JSON.parse(sessionStorage.getItem('localisation') || 'null');

    if (datalocalisation) {
      console.log('localisation infos trouvé en session:', datalocalisation);
      this.localisation = datalocalisation;
    } else {
      console.warn('Aucun localisation trouvé dans sessionStorage');
    }

    const datacoordonne = JSON.parse(sessionStorage.getItem('coordonne') || 'null');

    if (datacoordonne) {
      console.log('coordonne infos trouvé en session:', datacoordonne);
      this.coordonne = datacoordonne;
    } else {
      console.warn('Aucun coordonne trouvé dans sessionStorage');
    }
  }
}
