import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../user/services/auth/auth.service';

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

  constructor(private router: Router, private _activateRouter: ActivatedRoute, private auth: AuthService) { }

  login_form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),

  });

  Loginuser() {
    this.is_loading = true;
    let body = this.login_form?.value;

    this.auth.LoginUser(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          this.data = res;
          if (res.user_infos) {
            sessionStorage.setItem('user_infos', JSON.stringify(res.user_infos));
          } else {
            console.error('user_infos is missing in the response');
          }
          sessionStorage.setItem('access_token', res.access_token);

          Swal.fire({
            title: 'Success!',
            text: 'User login successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['/user/home']);
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
