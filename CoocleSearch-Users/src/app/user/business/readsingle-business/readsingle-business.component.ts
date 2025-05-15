import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from "../../include/header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../services/users/business.service';

@Component({
  selector: 'app-readsingle-business',
  standalone: true,
  templateUrl: './readsingle-business.component.html',
  styleUrls: ['./readsingle-business.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent],

})
export class ReadsingleBusinessComponent implements OnInit{

  business: any; // Stocke les détails du produit
  backToTopBtnVisible = false; // État du bouton
  businessUid: string | undefined;

  constructor(private route: Router, private http: BusinessService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
    this.businessUid = params['bu_uid']; // (+) converts string 'id' to a number  }
    console.log(this.businessUid);
    })
    this.readSingleBusiness()
  }

  readSingleBusiness(): void {
    let body = {
      bu_uid: this.businessUid
    }
    this.http.ReadSingleBusiness(body).subscribe({
      next: (response: any) => {
        this.business = response?.business; // Stocker les produits dans le tableau
        console.log(this.business);

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
