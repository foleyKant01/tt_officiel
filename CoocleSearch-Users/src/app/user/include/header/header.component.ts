import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BusinessService } from '../../services/users/business.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router, private http: BusinessService) { }

  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  profileMenuVisible = false;
  user_infos: any
  isLoggedIn: boolean = false;
  businessList: any[] = [];
  searchDone = false;
  backToTopBtnVisible = false;

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  Searchbusiness() {
    const searchText = this.search_form.get('textSearch')?.value.trim();
    if (!searchText) return;

    this.http.SearchBusinessByCategorie(this.search_form.value).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);
        this.searchDone = true;

        if (reponse?.status === 'success' && Array.isArray(reponse.business)) {
          this.businessList = reponse.business;

          this.router.navigate(['/user/home'], {
            queryParams: { data: JSON.stringify(this.businessList) }
          });
        } else {
          this.businessList = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.searchDone = true;
        this.businessList = [];
      }
    });
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user_infos');
    this.isLoggedIn = !!user;
    this.user_infos = user
  }
}
