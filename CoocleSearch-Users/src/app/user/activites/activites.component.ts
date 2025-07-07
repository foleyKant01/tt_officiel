import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../include/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from '../services/users/business.service';
import { ActivitesService } from '../services/users/activites.service';

@Component({
  selector: 'app-activites',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './activites.component.html',
  styleUrl: './activites.component.scss'
})
export class ActivitesComponent implements OnInit{

  constructor(private router: Router, private http: ActivitesService) { }

  favs_List: any[] = [];
  histo_List: any[] = [];
  user_infos: any
  user_id: any
  bu_name: any
  businessList: any[] = [];
  favoriteList: any[] = [];
  loading = false;
  currentTab: string = 'favoris';

  readAllFavorisByUser() {
    this.loading = true;
    let body = {
      user_id : this.user_id
    }
    this.http.ReadAllFavorisByUser(body).subscribe({
      next: (reponse: any) => {
        console.log('response favs_List:', reponse);
        if (reponse?.status === 'success' && Array.isArray(reponse.favs_informations)) {
          setTimeout(() => {
            this.loading = false;
            this.favs_List = reponse.favs_informations;
          }, 1000);
        }
        else {
          this.favs_List = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement :', err);
        this.favs_List = [];
      }
    });
  }

  readAllHistoriqueByUser() {
    this.loading = true;
    let body = {
      user_id : this.user_id
    }
    this.http.ReadAllHistoriqueByUser(body).subscribe({
      next: (reponse: any) => {
        if (reponse?.status === 'success') {
          this.histo_List = reponse.histo_informations;
          this.bu_name = reponse.histo_informations.bu_name;
          console.log('histo_List:', this.histo_List);
          console.log('bu_name:', this.bu_name);
          setTimeout(() => {
            this.loading = false;
            this.histo_List = reponse.histo_informations;
          }, 2000);
        }
        else {
          this.histo_List = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement :', err);
        this.histo_List = [];
      }
    });
  }

  readSingleBusiness(bu_uid: string): void {
    this.router.navigate(['/user/business/readsingle-business', bu_uid]);
  }

  visibleCount = 6;
  get visibleBusinessList() {
    return this.businessList.slice(0, this.visibleCount);
  }

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
    window.location.reload();

  }

  saveFavoris(business: any ) {
    const payload = {
      ...business,
      user_id: this.user_id
    };
    console.log('payload:', payload);
    this.http.SaveFavoris(payload).subscribe({
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
    this.http.DeleteFavoris(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.favoriteList = [];
      }
    });
  }

  deleteHistorique(business: any ) {
    const payload = {
      ...business,
      user_id: this.user_id
    };
    console.log('payload:', payload);
    this.http.DeleteHistoriques(payload).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.favoriteList = [];
      }
    });
    window.location.reload();
  }

  ngOnInit(): void {

    const user = sessionStorage.getItem('user_infos');
    this.user_infos = user
    console.log(this.user_infos);
    if (user) {
      this.user_infos = JSON.parse(user); // Convertir en objet
      this.user_id = this.user_infos.u_uid
      console.log('user_id:', this.user_id);

    this.readAllFavorisByUser();
    this.readAllHistoriqueByUser()
  }

  const dataBusiness = JSON.parse(sessionStorage.getItem('businessList') || 'null');
  if (dataBusiness) {
    console.log('Business infos trouvé en session:', dataBusiness);
    this.businessList = dataBusiness;
  } else {
    console.warn('Aucun Business trouvé dans sessionStorage');
  }

}
}