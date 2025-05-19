import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../services/users/business.service';
import { ActivitesService } from '../services/users/activites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

  data: any;

  constructor(private router: Router, private http: BusinessService, private route: ActivatedRoute, private api: ActivitesService ) { }

  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  businessList: any[] = [];
  searchDone = false;
  backToTopBtnVisible = false; // État du bouton
  isLoggedIn: boolean = false;
  dataBusiness: string | undefined;
  user_infos: any
  user_id: any
  loading = false;
  favoriteList: any[] = [];



  Searchbusiness() {
    this.loading = true;
    const searchText = this.search_form.get('textSearch')?.value.trim();
    if (!searchText) return;
    const payload = {
      textSearch: searchText,
      user_id: this.user_id
    };
    this.http.SearchBusinessByCategorie(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);

        if (reponse?.status === 'success' && Array.isArray(reponse.business)) {
          setTimeout(() => {
            this.loading = false;
            this.businessList = reponse.business;
            this.searchDone = true;
          }, 2000);
          if (reponse.business) {
            sessionStorage.setItem('business', JSON.stringify(reponse.business));
          }
        }
        else {
          this.businessList = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.searchDone = true;
        this.businessList = [];
      }
    });
  }

  navigateToHome() {
    window.location.href = '/user/home';
  }

  readSingleBusiness(bu_uid: string): void {
    this.router.navigate(['/user/business/readsingle-business', bu_uid]);
  }

  visibleCount = 6;
  get visibleBusinessList() {
    return this.businessList.slice(0, this.visibleCount);
  }

  showAll() {
    this.visibleCount = this.businessList.length;
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
    sessionStorage.removeItem('business');
  };


  isFavorite(business: any): boolean {
    return business.is_favs === 1;
  }

  toggleFavorite(business: any): void {
    this.favoriteList = this.businessList.filter(b => b.is_favs === 1);

    // Trouver l'index dans le tableau global
    const index = this.businessList.findIndex(b => b.bu_uid === business.bu_uid);
    if (index > -1) {
      // Basculer l'état
      this.businessList[index].is_favs = this.businessList[index].is_favs === 1 ? 0 : 1;

      // Mettre à jour favoriteList
      this.favoriteList = this.businessList.filter(b => b.is_favs === 1);

      // Mettre à jour sessionStorage
      sessionStorage.setItem('businessList', JSON.stringify(this.businessList));

      // (Optionnel) appel serveur pour enregistrer le changement
      if (this.businessList[index].is_favs === 1) {
        this.saveFavoris(this.businessList[index]);
      } else {
        this.deleteFavoris(this.businessList[index]);
      }
    }
  }

  saveFavoris(business: any ) {
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

  deleteFavoris(business: any ) {
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
      if (data) {
        this.businessList = JSON.parse(data);
        console.log(this.businessList);
      }
    });
    const dataBusiness = JSON.parse(sessionStorage.getItem('business') || 'null');
    if (dataBusiness) {
      console.log('Business infos trouvé en session:', dataBusiness);
      this.businessList = dataBusiness;
    } else {
      console.warn('Aucun Business trouvé dans sessionStorage');
    }
    // Supprime la clé 'business' à chaque actualisation de la page
      window.addEventListener('beforeunload', this.unloadCallback);

  }

}
}