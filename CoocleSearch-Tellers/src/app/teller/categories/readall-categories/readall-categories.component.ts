import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-readall-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './readall-categories.component.html',
  styleUrls: ['./readall-categories.component.scss']
})
export class ReadallCategoriesComponent implements OnInit{

  // category: any;
  categories: any[] = [];
  dataCategories: any[] = [];
  deleteResult: any[] = [];
  allCategories: string[] = [];
  // searchCategories: string[] = [];

  // //Variable Note
  // data_note: any;
  // note: any;
  // searchNote: string[] = [];
  // response: any;

  constructor(private router: Router, private http: CategoriesService){}
  ngOnInit(): void {
      this.Readallcategories();
  }


  //Fonction pour readall categories
  Readallcategories(): void {
    this.http.ReadAllCategories().subscribe({
      next: (response: any) => {
        this.allCategories = response || []; // Stocker les produits dans le tableau
        if(response?.categories)  {
          this.dataCategories = response?.categories
          console.log(this.dataCategories)
        }
      },
    })
  }

  RedirectToUpdateCategories(ca_uid: number): void {
    this.router.navigate(['/admin/categories/update-categories', ca_uid]);
  }

  // editCategorie(ca_uid: string, name: string) {
  //   // Redirigez l'utilisateur vers la page de modification avec l'ID de la catégorie dans l'URL
  //   this.router.navigate(['admin' , 'update-categories', ca_uid, name]);
  // }


  deleteCategorie(ca_uid: string): void {
    let body = {
      ca_uid: ca_uid
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.http.DeleteCategories(body).subscribe({
        next: (res: any) => {
          this.deleteResult = res?.status
          console.log('Uid: ',body);
          console.log(this.deleteResult);
          window.location.reload();
        },

      });
    }
  }


}
