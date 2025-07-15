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
export class CreateBusinessComponent implements OnInit {

  data: string[] = [];

  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;
  allBusiness: string[] = [];
  business: any;
  loading = false;
  delayDuration = 2000;
  file: any

  success = false;
  allCategories: string[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  constructor(private router: Router, private fb: FormBuilder, private http: BusinessService, private api: CategoriesService) { }

  get typeValue(): string {
    return this.createbusiness.get('type')?.value;
  }

  loadCategories() {
    this.api.ReadAllCategories()?.subscribe({
      next: (response: any) => {
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
      city: new FormControl(null),
      address: new FormControl(null),
      phone: new FormControl(null, Validators.required),
      bu_picture: new FormControl(null, Validators.required),
      t_uid: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    }
  )

  Createbusiness() {
    // this.loading = true;
    // let body = this.createbusiness?.value;

    if (this.createbusiness.valid) {
      this.loading = true;

      const formData: FormData = new FormData();
      formData.append('categorie', this.createbusiness.get('categorie')?.value);
      formData.append('type', this.createbusiness.get('type')?.value);
      formData.append('name', this.createbusiness.get('name')?.value);
      formData.append('description', this.createbusiness.get('description')?.value);
      formData.append('email', this.createbusiness.get('email')?.value);
      formData.append('city', this.createbusiness.get('city')?.value);
      formData.append('address', this.createbusiness.get('address')?.value);
      formData.append('phone', this.createbusiness.get('phone')?.value);
      formData.append('bu_picture', this.file as File);
      formData.append('t_uid', this.createbusiness.get('t_uid')?.value);
      formData.append('latitude', this.createbusiness.get('latitude')?.value);
      formData.append('longitude', this.createbusiness.get('longitude')?.value);

      this.http.CreateBusiness(formData).subscribe({
        next: (reponse: any) => {
          console.log(reponse);
          if (reponse?.status === 'success') {
            this.data = reponse;
            Swal.fire({
              title: 'Succès !',
              text: 'L\'entité a été créée avec succès !',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#dda706'
            }).then(() => {
              window.location.reload();  // Recharger la page après 3 secondes
            });
          } else {
            Swal.fire({
              title: 'Erreur !',
              text: reponse?.error_description || 'Échec de création.',
              icon: 'error',
              confirmButtonText: 'Réessayer',
              confirmButtonColor: '#ff6c2f'
            });
          }
        },
        error: (error) => {
          console.error(error);
          setTimeout(() => {
            this.loading = false;
          }, this.delayDuration);
        }
      });
    }
  }


  onFileChange(event: any) {
    console.log(event);
    let file = event.target.files[0];
    this.file = file;
    console.log(this.file);

    return file;
  }


}
