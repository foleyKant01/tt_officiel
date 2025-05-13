import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './../include/header/header.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  data: any;

  constructor(private router: Router, private http: UsersService) { }


  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  Searchbusiness(){
    this.http.SearchBusinessByCategorie(this.search_form.value).subscribe({
      next: (reponse:any)=>{
        console.log('Response:', reponse);
        if (reponse?.status === 'success') {
          this.data = reponse;
          // this.router.navigate(['/user',' trouveztout']);
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
