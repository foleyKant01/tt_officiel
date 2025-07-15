import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-readall-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './readall-business.component.html',
  styleUrls: ['./readall-business.component.scss']
})
export class ReadallBusinessComponent implements OnInit {

  business: any[] = [];
  dataCategorie: any[] = [];
  deleteResult: any[] = [];
  dataBusiness: any
  allBusiness: string[] = [];
  allCategories: string[] = [];


  constructor(private router: Router, private http: BusinessService, private api: CategoriesService) { }

  ngOnInit(): void {
    this.Readallbusiness();
    this.loadCategories();
  }


  Readallbusiness(): void {
    this.http.ReadAllBusiness().subscribe({
      next: (response: any) => {
        this.allBusiness = response || []; // Stocker les produits dans le tableau
        if (response?.business) {
          this.dataBusiness = response?.business
        }
      },
    })
  }

  Readsinglebusiness(bu_uid: number): void {
    this.router.navigate(['/teller/business/readsingle-business', bu_uid]);
  }


  loadCategories() {
    this.api.ReadAllCategories()?.subscribe({
      next: (response: any) => {
        this.dataCategorie = response?.categorie_name
        this.allCategories = this.dataCategorie.map((category: any) => category?.name);
        // console.log(this.dataCategorie)
      }
    });
  }


  searchbusiness: FormGroup = new FormGroup(
    {
      bu_categorie: new FormControl(null, Validators.required),
    }
  )

  Readallbusinessbycategories() {
    let body = this.searchbusiness?.value;
    this.http.ReadAllBusinessByCategories(this.searchbusiness.value).subscribe({
      next: (response: any) => {
        this.allBusiness = response || [];
        if (response?.business) {
          this.dataBusiness = response?.business
          // console.log(this.dataBusiness)
        }
      },
    })
  }

  Readsingleproducts(bu_uid: number): void {
    this.router.navigate(['/admin/business/edit-business', bu_uid]);
  }


  Deleteproduct(bu_uid: any): void {
    console.log(bu_uid)
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.http.DeleteBusiness(bu_uid).subscribe({
        next: (response: any) => {
          console.log('Product deleted successfully:', response);
          this.deleteResult = response?.status
          console.log(this.deleteResult)
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
        }
      });
    }
  }

}
