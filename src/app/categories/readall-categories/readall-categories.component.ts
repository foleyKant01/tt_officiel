import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-readall-categories',
  templateUrl: './readall-categories.component.html',
  styleUrls: ['./readall-categories.component.scss']
})
export class ReadallCategoriesComponent implements OnInit{

  category: any;
  data: any;
  searchCategories: string[] = [];

  //Variable Note
  data_note: any;
  note: any;
  searchNote: string[] = [];
  response: any;

  constructor(private router: Router, private http: ApiService){}

  ngOnInit(): void {
    this.loadCategories();
    this.loadDescription();
  }

  // Get Categories

  loadCategories() {
    this.http.ReadAllCategories()?.subscribe({
      next: (response:any) =>{
        if(response?.categories)  {
          this.data = response?.categories
          this.searchCategories = this.data.map((category: any) => category?.name);
          // console.log(this.data)
        }
      }
    });
  }
  // loadDescription() {
  //   this.http.ReadAllCategories()?.subscribe({
  //     next: (response:any) =>{
  //       if(response?.categories)  {
  //         this.data_note = response?.categories
  //         this.searchNote = this.data_note.map((note: any) => note?.description);
  //         // console.log(this.searchNote)
  //       }
  //     }
  //   });
  // }
  loadDescription() {
    this.http.ReadAllCategories()?.subscribe(
      (response: any[]) =>{
          this.response = response
          console.log(this.response.categories)
        }
    );
  }


  // Update Categories

  editCategory(ca_uid: string) {
    // Redirigez l'utilisateur vers la page de modification avec l'ID de la catégorie dans l'URL
    this.router.navigate(['admin' , 'update-categories', ca_uid]);
  }


}
