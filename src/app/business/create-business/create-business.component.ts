import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit{


  category: any;
  searchCategories: string[] = [];
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

}
