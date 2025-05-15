import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../services/users/business.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

  data: any;

  constructor(private router: Router, private http: BusinessService, private route: ActivatedRoute) { }


  search_form: FormGroup = new FormGroup({
    textSearch: new FormControl(null, Validators.required),
  });

  businessList: any[] = [];
  searchDone = false;
  backToTopBtnVisible = false; // État du bouton
  isLoggedIn: boolean = false;
  user_infos: any

  Searchbusiness() {
    const searchText = this.search_form.get('textSearch')?.value.trim();
    if (!searchText) return;

    this.http.SearchBusinessByCategorie(this.search_form.value).subscribe({
      next: (reponse: any) => {
        console.log('Response:', reponse);
        this.searchDone = true;

        if (reponse?.status === 'success' && Array.isArray(reponse.business)) {
          this.businessList = reponse.business;
        } else {
          this.businessList = [];  // Aucun résultat trouvé
        }
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
        this.searchDone = true;
        this.businessList = [];
      }
    });
  }

  navigateToHome() {
    window.location.href = '/user/home';
  }

  readSingleBusiness(bu_uid: string): void {
    this.router.navigate(['/user/business/readsingle-business', bu_uid]);
  }

  visibleCount = 6;
  get visibleBusinessList() {
    return this.businessList.slice(0, this.visibleCount);
  }

  showAll() {
    this.visibleCount = this.businessList.length;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    this.backToTopBtnVisible = scrollPosition > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  profileMenuVisible = false;

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user_infos');
    this.isLoggedIn = !!user;
    console.log(this.isLoggedIn);
    this.user_infos = user
    console.log(this.user_infos);

    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      if (data) {
        this.businessList = JSON.parse(data);
        console.log(this.businessList);
      }
    });
  }

}
