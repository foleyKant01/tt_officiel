import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.scss']
})
export class CreateadminComponent implements OnInit{

  loading= false;
  delayDuration= 3000;
  success = false;

  constructor(private router: Router, private http: ApiService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  createuser: FormGroup = new FormGroup(
    {
      fullname: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    }
  )

  Createuser(){
    if (this.createuser.valid) {
      this.loading = true;

    this.http.CreateUser(this.createuser.value).subscribe({
      next: (reponse:any)=>{
        console.log(reponse);
        setTimeout(() => {
          this.loading = false;
          this.success = true;
          window.location.reload();
        }, this.delayDuration);

      },
      error: (error) => {
        console.error(error);
        setTimeout(() => {
          this.loading = false;
        }, this.delayDuration); // Désactiver le spinner en cas d'erreur
      }
    })
    }
  }

}
