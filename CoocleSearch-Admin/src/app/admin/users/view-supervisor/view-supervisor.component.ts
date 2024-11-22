import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-supervisor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-supervisor.component.html',
  styleUrl: './view-supervisor.component.scss'
})
export class ViewSupervisorComponent implements OnInit{
  driver_data: any []= [];
  supervisor_data: any = {}; 

  user_id : any
  constructor(private http: UsersService,  private activateroute: ActivatedRoute){}


 singleSupervisor(){
    let body = {
      user_id : this.user_id
    }
    this.http.GetSingleDriverOrSupervisor(body).subscribe({
      next:(res: any) =>{
        this.supervisor_data = res?.user
        this.allDrivers(); 

    },
    error:(err: any) =>{
      console.log(err);  
    },
    complete() {
        console.log('complete');   
    },
    })
  }


  allDrivers() {
    let body = { supervisor: this.user_id };
    this.http.GetAllDriver(body).subscribe({
        next: (res: any) => {
            this.driver_data = res?.driver;

            this.driver_data = this.driver_data.map((driver: any) => {
                if (driver.supervisor === this.user_id) {
                    driver.supervisorName = this.supervisor_data?.fullname || 'N/A';
                } else {
                    driver.supervisorName = 'N/A'; 
                }
                console.log(driver.supervisorName);
                return driver;
            });
        },
        error: (err: any) => {
            console.log(err);
        },
        complete() {
            console.log('complete');
        }
    });
}




  ngOnInit(): void {
    this.activateroute.params.subscribe((params) => {
      this.user_id = params['user_id'];
      console.log(this.user_id);
      

      this.singleSupervisor()
    });
  }
  

}
