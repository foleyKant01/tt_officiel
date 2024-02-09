import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-readsingle',
  templateUrl: './readsingle.component.html',
  styleUrls: ['./readsingle.component.scss']
})
export class ReadsingleComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(private router: Router, private http: ApiService){}

  readsingleuser: FormGroup = new FormGroup(
    {
      u_uid: new FormControl('', Validators.required),
    }
  )

  Readsingleuser(){
    this.http.ReadSingleUser(this.readsingleuser.value).subscribe({
      next: (reponse:any)=>{
        console.log(reponse)
      }
    })
  }


}
