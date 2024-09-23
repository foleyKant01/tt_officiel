import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-readall-business',
  templateUrl: './readall-business.component.html',
  styleUrls: ['./readall-business.component.scss']
})
export class ReadallBusinessComponent implements OnInit {

  data: any;

  constructor(private router: Router, private http: BusinessService) { }

  ngOnInit(): void {
    // $('.table').DataTable();
    this.loadBusiness();

  }


  loadBusiness() {
    this.http.ReadAllBusiness()?.subscribe({
      next: (res: any) => {
        this.data = res?.business
        console.log(this.data)
      }
    });
  }

}
