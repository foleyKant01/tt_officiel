import { AttendenceService } from './../../services/attendence/attendence.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-attendence',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.scss'
})
export class AttendenceComponent implements OnInit{
  data: any;

  constructor(private http: AttendenceService){}


  filter_form : FormGroup = new FormGroup({
    start_date: new FormControl(null, Validators.required),
    end_date: new FormControl(null, Validators.required),
  })

  filter(){}

  allAttendences(){
    this.http.GetAllAssignments({}).subscribe({
      next:(res: any) =>{
          this.data = res?.attendence
      },
      error:(err: any) =>{
        console.log(err);
        
      },
      complete() {
          console.log('complete');
          
      },
    })
  }
  
  ngOnInit(): void {
    this.allAttendences()
  }

}
