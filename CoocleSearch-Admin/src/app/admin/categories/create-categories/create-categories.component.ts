import { CategoriesService } from './../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent  {

  constructor(private router: Router, private fb: FormBuilder, private http: CategoriesService){}

  // Fonction create Categorie
  createcategories: FormGroup = new FormGroup(
    {
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
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
