import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-readall-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './readall-business.component.html',
  styleUrls: ['./readall-business.component.scss']
})
export class ReadallBusinessComponent implements OnInit{

  allBusiness: any;
  teller_infos: any
  t_uid: any
  dataBusiness: any

  constructor(private route: ActivatedRoute, private router: Router, private http: BusinessService, private api: CategoriesService){}

  ngOnInit(): void {

    const teller = sessionStorage.getItem('teller_infos');
    this.teller_infos = teller
    if (teller) {
      this.teller_infos = JSON.parse(teller); // Convertir en objet
      this.t_uid = this.teller_infos.t_uid
    }
    console.log('t_uid: ',this.t_uid);
    this.Readallbusinessbyteller();


  }

  Readallbusinessbyteller(): void {
    let body = {
      t_uid: this.t_uid
    }
    this.http.ReadAllBusinessByTeller(body).subscribe({
      next: (response: any) => {
        this.allBusiness = response; // Stocker les produits dans le tableau
        if(response?.business)  {
          this.dataBusiness = response?.business
          console.log(this.dataBusiness)
        }
      },
    })
  }


  Readsinglebusiness(bu_uid: number): void {
    this.router.navigate(['/teller/business/readsingle-business', bu_uid]);
  }


  // Deleteproduct(bu_uid: any): void {
  //   console.log(bu_uid)
  //   if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
  //     this.http.DeleteBusiness(bu_uid).subscribe({
  //       next: (response: any) => {
  //         console.log('Product deleted successfully:', response);
  //         this.deleteResult = response?.status
  //         console.log(this.deleteResult)

  //         // Actualiser la liste des produits après la suppression
  //         // this.viewallProducts();
  //       },
  //       error: (error) => {
  //         console.error('Failed to delete product:', error);
  //       }
  //     });
  //   }
  // }





  // readsingleProducts(pr_uid: number, type: string): void {
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  //     this.router.navigate(['/user/read-single-product', pr_uid, type]));
  // }

}
