import { CategoriesService } from './../../../services/categories/categories.service';
import { BusinessService } from './../../../services/business/business.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-business',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit{

  // Variable commun
  data: string[] = [];

  // Variables Geo
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  //Variable Business
  allBusiness: string[] = [];
  business: any;
  loading= false;
  delayDuration= 2000;
  success = false;

  // category: any;
  allCategories: string[] = [];
  // searchIterm: any = '';
  // filteredItems: string[] = [];
  // filteredCategories: string[] = [];
  // showError: boolean = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  constructor(private router: Router, private fb: FormBuilder, private http: BusinessService, private api: CategoriesService){}

  loadCategories() {
    this.api.ReadAllCategories()?.subscribe({
      next: (response:any) =>{
        this.data = response?.categorie_name
        this.allCategories = this.data.map((category: any) => category?.name);
        console.log(this.allCategories)
      }
    });
  }

  // Fonction create Business
  createbusiness: FormGroup = new FormGroup(
    {
      categorie: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      image1: new FormControl(null, Validators.required),
      image2: new FormControl(null, Validators.required),
      // latitude: new FormControl(null, Validators.required),
      // longitude: new FormControl(null, Validators.required),
    }
  )

  Createbusiness(){

    this.loading = true;
    let body = this.createbusiness?.value;

    this.http.CreateBusiness(this.createbusiness.value).subscribe({
      next : (reponse:any)=>{
        console.log(reponse);
        // setTimeout(() => {
        //   this.loading = false;
        //   this.success = true;
        //   window.location.reload();
        // }, this.delayDuration);
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.loading = false;
        }, this.delayDuration); // Désactiver le spinner en cas d'erreur
      }
    })
  }

  GetLocalisation(){
  }







  // filterItems() {
  //   this.filteredItems = this.allCategories.filter((category: string) =>
  //     category.toLowerCase().includes(this.searchIterm.toLowerCase())
  //   );
  // }

  // selectItems(category: string) {
  //   this.searchIterm = category;
  //   this.filteredItems = [];
  //   this.showError = false;
  // }

  // submitForm() {
  //   if (!this.allCategories.includes(this.searchIterm)) {
  //     this.showError = true;
  //     setTimeout(() => {
  //       this.showError = false;
  //     }, 5000);
  //   } else {
  //     this.showError = false;
  //   }
  // }

}
