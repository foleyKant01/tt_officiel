import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private router: Router, private http: ApiService){}

  loginuser: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }
  )

  Loginuser(){
    this.http.LoginUser(this.loginuser.value).subscribe({
      next: (reponse:any)=>{
        console.log(reponse);
        if (reponse.success) {
          console.log("Redirection vers la page profil");
          this.router.navigate(['/user',' trouveztout']);
        }
      }
    })
  }

}
