import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  data: any;
  is_loading: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  login_form: FormGroup = new FormGroup({
    identifiant: new FormControl(null, Validators.required),
    t_password: new FormControl(null, Validators.required),

  });

  loginTeller() {
    // this.is_loading = true;
    let body = this.login_form?.value;

    this.auth.LoginTeller(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          this.data = res;
          if (res.teller_infos) {
            sessionStorage.setItem('teller_infos', JSON.stringify(res.teller_infos));
          } else {
            console.error('teller_infos is missing in the response');
          }
          sessionStorage.setItem('access_token', res.access_token);

          Swal.fire({
            title: 'Success!',
            text: 'Teller login successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['teller']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || 'Login failed',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#ff6c2f'
          });
          this.is_loading = false;
        }
      },
      error: (err) => {
        console.log('Error:', err);
        Swal.fire({
          title: 'Error!',
          text: err.error_description || 'An error occurred',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ff6c2f'
        });
        this.is_loading = false;
      },
      complete: () => {
        console.log('Request complete');
        this.is_loading = false;
      }
    });
  }




  ngOnInit(): void {
  }
}
