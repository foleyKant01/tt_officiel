import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private http: ApiService){}

  createuser: FormGroup = new FormGroup(
    {
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    }
  )

  Createuser(){
    this.http.CreateUser(this.createuser.value).subscribe({
      next: (reponse:any)=>(
        console.log(reponse)
      )
    })
  }

}
