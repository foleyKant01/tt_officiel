
import { Component, OnInit } from '@angular/core';
// import { CategorieService } from '../../services/categorie.service';


@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent{
//   updateCategoryForm: FormGroup;
//   loading = false;
//   categoryId: any;

//   constructor(private router: ActivatedRoute, private http: CategorieService, private formBuilder: FormBuilder){
//     this.updateCategoryForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required]
//     });
//   }
//   ngOnInit(): void {
// // Récupérer l'ID de la catégorie depuis l'URL
// this.categoryId = this.router.snapshot.params['ca_uid'];

// // Charger les informations de la catégorie à modifier
// this.http.ReadSingleCategories(this.categoryId).subscribe((category: any) => {
//   // Pré-remplir le formulaire avec les informations de la catégorie
//   this.updateCategoryForm.patchValue({
//     name: category.name,
//     description: category.description
//   });
// });
// }

//   updateCategory() {
//     if (this.updateCategoryForm.valid) {
//       this.loading = true;

//       const updatedCategory = {
//         ca_uid: this.categoryId,
//         name: this.updateCategoryForm.value.name,
//         description: this.updateCategoryForm.value.description
//       };

//       // Appeler la fonction de mise à jour de la catégorie dans le service API
//       this.http.UpdateCategories(updatedCategory).subscribe({
//         next: (response: any) => {
//           console.log(response);
//           // Rediriger ou afficher un message de succès
//         },
//       });
//     }
//   }
}
