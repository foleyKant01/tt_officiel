import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private http: ApiService){}

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
    // else{
    //   alert('Veuillez remplir tous les champs obligatoires avant de soumettre le formulaire.');
    // }
  }
}
