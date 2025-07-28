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
    if (!this.login_form?.valid) {
      this.showErrorToast('Veuillez remplir correctement tous les champs.');
      return;
    }

    const body = this.login_form.value;

    this.auth.LoginUser(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);

        if (res?.status === 'success') {
          if (res.user_infos && res.access_token) {
            sessionStorage.setItem('user_infos', JSON.stringify(res.user_infos));
            sessionStorage.setItem('access_token', res.access_token);
            this.router.navigate(['/user/home']);
          } else {
            console.error('user_infos or access_token is missing in the response');
            this.showErrorToast('Erreur lors de la récupération des informations utilisateur.');
          }
        } else {
          this.showErrorToast(res?.message || 'Échec de la connexion.');
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.showErrorToast('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
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
