import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../user/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  data: any;
  loading = false;
  is_loading: boolean = false;

  constructor(private router: Router, private _activateRouter: ActivatedRoute, private auth: AuthService) { }

  register_form: FormGroup = new FormGroup({
    u_username: new FormControl(null, Validators.required),
    u_mobile: new FormControl(null, Validators.required),
    u_city: new FormControl(null, Validators.required),
    u_address: new FormControl(null, Validators.required),
    u_email: new FormControl(null, Validators.required),
    u_password: new FormControl(null, Validators.required),
  });

  createUser() {
    this.loading = true;
    let body = this.register_form?.value;
    this.auth.CreateUser(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          this.data = res;
          if (res.user_infos) {
            sessionStorage.setItem('user_infos', JSON.stringify(res.user_infos));
          } else {
            console.error('user_infos is missing in the response');
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.showSuccessToast('Successful download');

            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 1000);
          }, 2000);
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
