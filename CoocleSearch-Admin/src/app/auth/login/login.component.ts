import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
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
    ad_password: new FormControl(null, Validators.required),

  });

  Loginadmin() {
    this.is_loading = true;
    let body = this.login_form?.value;

    this.auth.LoginAdmin(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          this.data = res;
          if (res.admin_infos) {
            sessionStorage.setItem('admin_infos', JSON.stringify(res.admin_infos));
          } else {
            console.error('admin_infos is missing in the response');
          }
          sessionStorage.setItem('access_token', res.access_token);

          Swal.fire({
            title: 'Success!',
            text: 'Admin login successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['/admin/dashboard']);
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
