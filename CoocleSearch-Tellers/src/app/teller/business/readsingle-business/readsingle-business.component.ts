import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';

@Component({
  selector: 'app-readsingle-business',
  templateUrl: './readsingle-business.component.html',
  styleUrls: ['./readsingle-business.component.scss']
})
export class ReadsingleBusinessComponent implements OnInit{

  bu_uid: any;
  ville: any;
  adresse: any;
  bu_website: any;
  all_business: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: BusinessService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bu_uid = params['bu_uid'];
      console.log('bu_uid reçu:', this.bu_uid);
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

      if (navigationEntries.length && navigationEntries[0].type === 'reload') {
        sessionStorage.removeItem('single_business');
        console.log("Page rechargée → single_business supprimé");
      }
      this.readSingleBusiness();
    });
  }

  goBack() {
    sessionStorage.removeItem('single_business');
    this.router.navigate(['/teller/business/readall-business']);
  }

  goToUpdate() {
    this.router.navigate(['/teller/business/update-business', this.all_business.bu_uid]);
  }

  readSingleBusiness() {
    let body = { bu_uid: this.bu_uid };
    console.log('Envoi au backend:', body);

    this.http.ReadSingleBusiness(body).subscribe({
      next: (reponse: any) => {
        console.log('Réponse backend:', reponse);
        if (reponse?.status === 'success') {
          this.all_business = reponse.business;
          sessionStorage.setItem('single_business', JSON.stringify(reponse.business));
          console.log('Business reçu:', this.all_business);
          if (this.all_business.bu_type === 'physique'){
          this.all_business = reponse.business;
            this.ville = 'Ville :'
            this.adresse = 'Adresse :'
            this.bu_website = 'Site web :'
          }
        } else {
          console.warn('Réponse sans succès');
        }
      },
      error: (error) => {
        console.error('Erreur API:', error);
      }
    });
  }


}
