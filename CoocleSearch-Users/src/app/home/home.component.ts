import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './../include/header/header.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private _activateRouter: ActivatedRoute, private user: UsersService) { }


  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  Searchbusinessbycategorie(){
    this.user.SearchBusinessByCategorie(this.search_form.value).subscribe({
      next: (reponse:any)=>{
        console.log(reponse);
        if (reponse.success) {
          console.log("Redirection vers la page profil");
          // this.router.navigate(['/user',' trouveztout']);
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
