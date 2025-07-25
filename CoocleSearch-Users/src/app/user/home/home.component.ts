import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../services/users/business.service';
import { ActivitesService } from '../services/users/activites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  data: any;
  textSearch: any;

  constructor(private router: Router, private http: BusinessService, private route: ActivatedRoute, private api: ActivitesService) { }

  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  All_business: any[] = [];
  searchDone = false;
  backToTopBtnVisible = false; // État du bouton
  isLoggedIn: boolean = false;
  dataBusiness: string | undefined;
  user_infos: any
  user_id: any
  localisation: any
  coordonne: any
  loading = false;
  favoriteList: any[] = [];


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


  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('businessList');
    sessionStorage.removeItem('user_infos');
    this.router.navigate(['/auth/login']);
  }

  navigateToHome() {
    window.location.href = '/user/home';
  }

  readSingleBusiness(bu_uid: string): void {
    this.router.navigate(['/user/business/readsingle-business', bu_uid]);
  }

  visibleCount = 6;
  get visibleBusinessList() {
    return this.All_business.slice(0, this.visibleCount);
  }

  showAll() {
    this.visibleCount = this.All_business.length;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    this.backToTopBtnVisible = scrollPosition > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  profileMenuVisible = false;

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  unloadCallback = () => {
    sessionStorage.removeItem('All_business');
    sessionStorage.removeItem('single_business');
    sessionStorage.removeItem('textSearch');
  };


  isFavorite(business: any): boolean {
    return business.is_favs === 1;
  }

  toggleFavorite(business: any): void {
    this.favoriteList = this.All_business.filter(b => b.is_favs === 1);

    const index = this.All_business.findIndex(b => b.bu_uid === business.bu_uid);
    if (index > -1) {
      this.All_business[index].is_favs = this.All_business[index].is_favs === 1 ? 0 : 1;
      this.favoriteList = this.All_business.filter(b => b.is_favs === 1);

      sessionStorage.setItem('All_business', JSON.stringify(this.All_business));

      if (this.All_business[index].is_favs === 1) {
        this.saveFavoris(this.All_business[index]);
      } else {
        this.deleteFavoris(this.All_business[index]);
      }
    }
  }

  saveFavoris(business: any) {
    const payload = {
      ...business,
      user_id: this.user_id
    };
    console.log('payload:', payload);
    this.api.SaveFavoris(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse.status);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.favoriteList = [];
      }
    });
  }

  deleteFavoris(business: any) {
    const payload = {
      ...business,
      user_id: this.user_id
    };
    console.log('payload:', payload);
    this.api.DeleteFavoris(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.favoriteList = [];
      }
    });
  }

  ngOnInit(): void {

    // this.searchDone = true;

    const user = sessionStorage.getItem('user_infos');
    this.isLoggedIn = !!user;
    this.user_infos = user
    console.log(this.user_infos);
    if (user) {
      this.user_infos = JSON.parse(user); // Convertir en objet
      this.user_id = this.user_infos.u_uid
      console.log('user_id:', this.user_id);

      this.route.queryParams.subscribe(params => {
        const data = params['data'];
        console.log('data:', this.data);
        if (data) {

          this.All_business = JSON.parse(data);
          console.log(this.All_business);
        }
      });
      const dataBusiness = JSON.parse(sessionStorage.getItem('All_business') || 'null');
      const datatextSearch = JSON.parse(sessionStorage.getItem('textSearch') || 'null');
      const datalocalisation = JSON.parse(sessionStorage.getItem('localisation') || 'null');
      const datacoordonne = JSON.parse(sessionStorage.getItem('coordonne') || 'null');
      if (dataBusiness) {
        console.log('Business infos trouvé en session:', dataBusiness);
        this.All_business = dataBusiness;
      } else {
        console.warn('Aucun Business trouvé dans sessionStorage');
      }

      if (datatextSearch) {
        console.log('textSearch infos trouvé en session:', datatextSearch);
        this.textSearch = datatextSearch;
      } else {
        console.warn('Aucun Business trouvé dans sessionStorage');
      }

      if (datalocalisation) {
        console.log('localisation infos trouvé en session:', datalocalisation);
        this.localisation = datalocalisation;
      } else {
        console.warn('Aucun localisation trouvé dans sessionStorage');
      }

      if (datacoordonne) {
        console.log('coordonne infos trouvé en session:', datacoordonne);
        this.coordonne = datacoordonne;
      } else {
        console.warn('Aucun coordonne trouvé dans sessionStorage');
      }

      window.addEventListener('beforeunload', this.unloadCallback);

    }

    this.getCurrentLocationAndAddress();

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
            // console.log('coordonne:', position.coords);
            // console.log('Ville:', location.city);
            // console.log('Commune:', location.commune);
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
          city: address.city || address.town || address.village || address.state,
          commune: address.suburb || address.neighbourhood || address.city_district
        };
      })
      .catch(error => {
        console.error('Erreur géocodage inverse :', error);
        return {};
      });
  }

}