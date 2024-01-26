import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-trouveztout',
  templateUrl: './trouveztout.component.html',
  styleUrls: ['./trouveztout.component.scss']
})
export class TrouveztoutComponent implements OnInit {

  categories: any;
  items: string[] = ['John', 'Jane', 'Doe', 'Alice', 'Bob'];
  searchIterms: string = '';
  filteredItems: string[] = [];
  showError: boolean = false;

  constructor(private router: Router, private http: ApiService){}


  ngOnInit(): void {
  }

  filterItems() {
    this.filteredItems = this.items.filter(items =>
      items.toLowerCase().includes(this.searchIterms.toLowerCase())
    );
}

selectItems(items: string) {
  this.searchIterms = items;
  this.filteredItems = [];
  this.showError = false;

}

submitForm() {
  if (!this.items.includes(this.searchIterms)) {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 5000);
  } else {
    this.showError = false;
  }
}
}
