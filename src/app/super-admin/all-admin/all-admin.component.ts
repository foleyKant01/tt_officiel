import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss']
})
export class AllAdminComponent implements OnInit{

      u_uid: string = '';
      firstname: string = '';
      lastname: string = '';
      username : string = '';
      mobile: string = '';
      address: string = '';
      email: string = '';
      city:  string = '';

  ngOnInit(): void {

  }

  constructor(private router: Router, private http: ApiService ){}

  Readalluser(){
    this.http.ReadAllUser().subscribe({
      next: (reponse:any)=>(
        console.log(reponse)
      )
    })
  }


}
