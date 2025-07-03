import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../../services/categories/categories.service';

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

  Createcategories(){
    if (this.createcategories.valid) {

      this.http.CreateCategories(this.createcategories.value).subscribe({
        next : (reponse:any)=>{
          console.log(reponse);
          alert('La création a été effectuée avec succès !');
          setTimeout(() => {
            window.location.reload();
          })
        },
      })
    }
    else{
      alert('Veuillez remplir tous les champs obligatoires avant de soumettre le formulaire.');
    }
  }
}
