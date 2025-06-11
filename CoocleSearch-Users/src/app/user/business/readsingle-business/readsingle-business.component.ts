import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from "../../include/header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../services/users/business.service';
import { Location } from '@angular/common';
import { HistoriquesService } from '../../services/users/historiques.service';


@Component({
  selector: 'app-readsingle-business',
  standalone: true,
  templateUrl: './readsingle-business.component.html',
  styleUrls: ['./readsingle-business.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],

})
export class ReadsingleBusinessComponent implements OnInit{

  business: any; // Stocke les détails du produit
  histo_infos: any; // Stocke les détails du produit
  backToTopBtnVisible = false; // État du bouton
  userEmail: string | undefined;
  businessUid: string | undefined;
  loading = false;
  textSearch: any
  user_infos: any
  user_id: any



  constructor(private route: Router, private http: BusinessService, private router: ActivatedRoute, private api: HistoriquesService) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
    this.businessUid = params['bu_uid']; // (+) converts string 'id' to a number  }
    console.log(this.businessUid);
    })

    this.readSingleBusiness()

    const text = sessionStorage.getItem('textSearch');
    this.textSearch = text
    console.log(this.textSearch);
    if (text) {
      this.textSearch = JSON.parse(text); // Convertir en objet
      console.log('textSearch:', this.textSearch);
    }

    const user = sessionStorage.getItem('user_infos');
    this.user_infos = user
    console.log(this.user_infos);
    if (user) {
      this.user_infos = JSON.parse(user); // Convertir en objet
      this.user_id = this.user_infos.u_uid
      console.log('user_id:', this.user_id);
    }
  }

  backStep(){
    sessionStorage.removeItem('single_business');
    history.back()
  }

  readSingleBusiness(): void {
    this.loading = true;
    let body = {
      bu_uid: this.businessUid
    }
    this.http.ReadSingleBusiness(body).subscribe({
      next: (response: any) => {
        console.log(this.business);
        console.log('user_id: ',this.user_id);
        this.saveHistorique()

        if (response?.status === 'success') {
          setTimeout(() => {
            this.loading = false;
            this.business = response?.business; // Stocker les produits dans le tableau
          }, 2000);
          if (response.business) {
            sessionStorage.setItem('single_business', JSON.stringify(response.business));
          }
        }
        else {
          this.business = [];
        }
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      }
    });

    }

  saveHistorique(): void {
    this.loading = true;
    let body = {
      bu_uid: this.businessUid,
      u_uid: this.user_id,
      textSearch: this.textSearch
    }
    this.api.SaveHistorique(body).subscribe({
      next: (response: any) => {

        if (response?.status === 'success') {
          setTimeout(() => {
            this.loading = false;
            this.histo_infos = response?.histo_infos;
          }, 2000);
        }
        else {
          this.business = [];
        }
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      }
    });

    }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    this.backToTopBtnVisible = scrollPosition > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
