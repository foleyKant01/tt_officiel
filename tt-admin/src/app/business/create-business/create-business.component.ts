import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-create-business',
  // standalone: true,
  // imports: [FormsModule,CommonModule,CreateBusinessComponent,BusinessComponent,],
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {

  // Variable commun
  data: any;

  // Variables Geo
  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;

  //Variable Business
  searchBusiness: string[] = [];
  business: any;


  ngOnInit(): void {
    this.loadCategories();
  }

  constructor(private router: Router, private http: BusinessService) { }

  // Fonction create Business

  createbusiness: FormGroup = new FormGroup(
    {
      categories: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      image1: new FormControl(null, Validators.required),
      image2: new FormControl(null, Validators.required),
    }
  )

  Createbusiness() {
    if (this.createbusiness.valid) {

      this.http.CreateBusiness(this.createbusiness.value).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('La création a été effectuée avec succès !');
          setTimeout(() => {
            // window.location.reload();
          });

        },
        // error: (error) => {
        //   console.error(error);
        //   setTimeout(() => {
        //   });
        // }
      })
    }
  }

  //Fonction pour readall categories

  loadCategories() {
    this.http.ReadAllCategories()?.subscribe({
      next: (res:any) =>{
          this.data = res?.categorie
          console.log(this.data)
      }
    });
  }
}
