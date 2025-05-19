import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../user/services/auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  data: any;
  loading = false;

  constructor(private router: Router, private _activateRouter: ActivatedRoute, private auth: AuthService) { }

  login_form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),

  });

  loginUser() {
    this.loading = true;
    let body = this.login_form?.value;

    this.auth.LoginUser(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          this.data = res;
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.showSuccessToast('Successful download');

            setTimeout(() => {
              this.router.navigate(['/user/home']);
            }, 1000);
          }, 2000);
          if (res.user_infos) {
            sessionStorage.setItem('user_infos', JSON.stringify(res.user_infos));
            sessionStorage.setItem('access_token', res.access_token);
          } else {
            console.error('user_infos is missing in the response');
          }
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.showErrorToast('An error has occurred while launching the store. Please try again. ')
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }


  showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) {
      toastBody.textContent = message;
    } else {
      console.warn('Success toast body element not found.');
    }
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
  }

  showErrorToast(message: string) {
    const toastBody = document.getElementById('errorToastBody');
    if (toastBody) {
      toastBody.textContent = message;
    } else {
      console.warn('Error toast body element not found.');
    }
    const toastElement = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
  }

  ngOnInit(): void {
  }
}
