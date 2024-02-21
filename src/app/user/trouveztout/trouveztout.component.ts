import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trouveztout',
  templateUrl: './trouveztout.component.html',
  styleUrls: ['./trouveztout.component.scss']
})
export class TrouveztoutComponent implements OnInit {

  category: any;
  item: any;
  searchCategories: string[] = [];
  // items: string[] = ['John', 'Jane', 'Doe', 'Alice', 'Bob'];
  searchItems: string[] = [];
  searchIterms: string = '';
  filteredItems: string[] = [];
  filteredCategories: string[] = [];
  showError: boolean = false;
  data: any;

  constructor(private router: Router, private http: ApiService){}


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.http.ReadAllCategories()?.subscribe({
      next: (response:any) =>{
        this.data = response?.categories
        this.searchCategories = this.data.map((category: any) => category?.name);
        console.log(this.searchCategories)
      }
    });
  }

  filterItems() {
    this.filteredItems = this.searchCategories.filter((category: string) =>
      category.toLowerCase().includes(this.searchIterms.toLowerCase())
    );
  }

  selectItems(category: string) {
    this.searchIterms = category;
    this.filteredItems = [];
    this.showError = false;
  }

submitForm() {
  if (!this.searchCategories.includes(this.searchIterms)) {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 5000);
  } else {
    this.showError = false;
  }
}
}
