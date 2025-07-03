import { CategoriesService } from './../../../services/categories/categories.service';
import { BusinessService } from './../../../services/business/business.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  data: string[] = [];

  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  allBusiness: string[] = [];
  business: any;
  loading= false;
  delayDuration= 2000;
  success = false;
  teller_infos: any
  t_uid: any

  allCategories: string[] = [];


  ngOnInit(): void {
    this.loadCategories();

    const user = sessionStorage.getItem('teller_infos');
    this.teller_infos = user
    console.log(this.teller_infos);
    if (user) {
      this.teller_infos = JSON.parse(user); // Convertir en objet
      this.t_uid = this.teller_infos.t_uid
      this.createbusiness.patchValue({
        t_uid : this.t_uid
      })
      console.log('t_uid:', this.t_uid);
    }
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
      t_uid: new FormControl(null, Validators.required),

      // latitude: new FormControl(null, Validators.required),
      // longitude: new FormControl(null, Validators.required),
    }
  )

  Createbusiness(){

    this.loading = true;
    let body = this.createbusiness?.value;

    this.http.CreateBusiness(body).subscribe({
      next : (reponse:any)=>{
        console.log(reponse);
        if (reponse?.status === 'success') {
          this.data = reponse;
          Swal.fire({
            title: 'Success!',
            text: 'Business was successfully created!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['teller']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: reponse?.error_description || 'Login failed',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#ff6c2f'
          });
        }
      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.loading = false;
        }, this.delayDuration); // Désactiver le spinner en cas d'erreur
      }
    })
    window.location.reload();

  }

  navigateToRead() {
    this.router.navigate(['/teller/business/readall-business']);
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
