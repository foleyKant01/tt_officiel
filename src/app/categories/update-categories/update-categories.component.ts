// update-categories.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {
  updateCategoryForm: FormGroup;
  loading = false;
  categoryId: string = "";

  constructor(private router: ActivatedRoute, private http: ApiService, private formBuilder: FormBuilder){
    this.updateCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
// Récupérer l'ID de la catégorie depuis l'URL
this.categoryId = this.router.snapshot.params['ca_uid'];

// Charger les informations de la catégorie à modifier
this.http.ReadSingleCategories(this.categoryId).subscribe((category: any) => {
  // Pré-remplir le formulaire avec les informations de la catégorie
  this.updateCategoryForm.patchValue({
    name: category.name,
    description: category.description
  });
});
}
//Gar de transport
//Des compagnies de transport pour des destination interne et externe du pays


  updateCategory() {
    if (this.updateCategoryForm.valid) {
      this.loading = true;

      const updatedCategory = {
        id: this.categoryId,
        name: this.updateCategoryForm.value.name,
        description: this.updateCategoryForm.value.description
      };

      // Appeler la fonction de mise à jour de la catégorie dans le service API
      this.http.UpdateCategories(updatedCategory).subscribe({
        next: (response: any) => {
          console.log(response);
          // Rediriger ou afficher un message de succès
        },
        error: (error) => {
          console.error(error);
          // Afficher un message d'erreur
        }
      });
    }
  }
}
