import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BusinessComponent } from '../business.component';

@Component({
  selector: 'app-create-business',
  standalone: true,
  imports: [FormsModule,CommonModule,CreateBusinessComponent,BusinessComponent,],
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit{

  category: any;
  searchCategories: string[] = [];
  searchIterm: any = '';
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
      category.toLowerCase().includes(this.searchIterm.toLowerCase())
    );
  }

  selectItems(category: string) {
    this.searchIterm = category;
    this.filteredItems = [];
    this.showError = false;
  }

  submitForm() {
    if (!this.searchCategories.includes(this.searchIterm)) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    } else {
      this.showError = false;
    }
  }

}
