import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CategorieService } from '../../services/categorie.service';


@Component({
  selector: 'app-readall-categories',
  templateUrl: './readall-categories.component.html',
  styleUrls: ['./readall-categories.component.scss']
})
export class ReadallCategoriesComponent{

  // category: any;
  // data: any;
  // searchCategories: string[] = [];

  // //Variable Note
  // data_note: any;
  // note: any;
  // searchNote: string[] = [];
  // response: any;

  // constructor(private router: Router, private http: CategorieService){}

  // ngOnInit(): void {
  //   this.loadCategories();
  //   // this.loadDescription();
  // }

  // // Get Categories

  // loadCategories() {
  //   this.http.ReadAllCategories()?.subscribe({
  //     next: (res:any) =>{
  //         this.data = res?.categorie
  //         // console.log(this.data)
  //     }
  //   });
  // }


  // editCategorie(ca_uid: string, name: string) {
  //   // Redirigez l'utilisateur vers la page de modification avec l'ID de la catégorie dans l'URL
  //   this.router.navigate(['admin' , 'update-categories', ca_uid, name]);
  // }


  // deleteCategorie(ca_uid: string): void {
  //   let body = {
  //     ca_uid: ca_uid
  //   }
  //   if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
  //     this.http.DeleteCategories(body).subscribe({
  //       next: (res: any) => {
  //         this.data = res?.status
  //         console.log('Uid: ',body);
  //         console.log(this.data);
  //         // Actualiser la liste des produits après la suppression
  //         window.location.reload();
  //       },

  //     });
  //   }
  // }


}
