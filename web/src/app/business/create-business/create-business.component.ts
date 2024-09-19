import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BusinessComponent } from '../business.component';

@Component({
  selector: 'app-create-business',
  // standalone: true,
  // imports: [FormsModule,CommonModule,CreateBusinessComponent,BusinessComponent,],
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit{

  // Variable commun
  data: any;

  // Variables Geo
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  //Variable Business
  searchBusiness: string[] = [];
  business: any;
  loading= false;
  delayDuration= 2000;
  success = false;

  // category: any;
  // searchCategories: string[] = [];
  // searchIterm: any = '';
  // filteredItems: string[] = [];
  // filteredCategories: string[] = [];
  // showError: boolean = false;



  ngOnInit(): void {
    // this.loadCategories();
    this.Readallbusiness();
  }

  constructor(private router: Router, private http: ApiService){}

  // Fonction create Business

  createbusiness: FormGroup = new FormGroup(
    {
      title: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      images1: new FormControl(null, Validators.required),
      images2: new FormControl(null, Validators.required),
    }
  )

  Createbusiness(){
    if (this.createbusiness.valid) {
      this.loading = true;

    this.http.CreateBusiness(this.createbusiness.value).subscribe({
      next : (reponse:any)=>{
        console.log(reponse);
        setTimeout(() => {
          this.loading = false;
          this.success = true;
          window.location.reload();
        }, this.delayDuration);

      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.loading = false;
        }, this.delayDuration); // Désactiver le spinner en cas d'erreur
      }
    })
    }
  }


  GetLocalisation(){
  }


  //Fonction pour readall business

  Readallbusiness() {
    this.http.ReadAllBusiness()?.subscribe({
      next: (response:any) =>{
        this.data = response?.busi
        this.searchBusiness = this.data.map((business: any) => business?.name);
        console.log(this.searchBusiness)
      }
    });
  }



  // loadCategories() {
  //   this.http.ReadAllCategories()?.subscribe({
  //     next: (response:any) =>{
  //       this.data = response?.categories
  //       this.searchCategories = this.data.map((category: any) => category?.name);
  //       console.log(this.searchCategories)
  //     }
  //   });
  // }

  // filterItems() {
  //   this.filteredItems = this.searchCategories.filter((category: string) =>
  //     category.toLowerCase().includes(this.searchIterm.toLowerCase())
  //   );
  // }

  // selectItems(category: string) {
  //   this.searchIterm = category;
  //   this.filteredItems = [];
  //   this.showError = false;
  // }

  // submitForm() {
  //   if (!this.searchCategories.includes(this.searchIterm)) {
  //     this.showError = true;
  //     setTimeout(() => {
  //       this.showError = false;
  //     }, 5000);
  //   } else {
  //     this.showError = false;
  //   }
  // }

}
