import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../../services/categories/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {

  teller_infos: any;
  t_uid: any;
  data: any;
  loading= false;
  delayDuration= 2000;

  constructor(private router: Router, private fb: FormBuilder, private http: CategoriesService){}
  ngOnInit(): void {
    const teller = sessionStorage.getItem('teller_infos');
    this.teller_infos = teller
    if (teller) {
      this.teller_infos = JSON.parse(teller); // Convertir en objet
      this.t_uid = this.teller_infos.t_uid
    }

    this.createcategories.patchValue({
      payment_method: "bank",
      create_by: this.t_uid
    })
  }

  // Fonction create Categorie
  createcategories: FormGroup = new FormGroup(
    {
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      create_by: new FormControl('', Validators.required),
    }
  )

  Createcategories() {
      this.loading = true;
      let body = this.createcategories?.value;

      this.http.CreateCategories(body).subscribe({
        next: (reponse: any) => {
          console.log(reponse);
          if (reponse?.status === 'success') {
            this.data = reponse;
            Swal.fire({
              title: 'Succès !',
              text: 'La Categorie a été créée avec succès !',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#dda706'
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Erreur !',
              text: reponse?.message || 'Échec de création.',
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
