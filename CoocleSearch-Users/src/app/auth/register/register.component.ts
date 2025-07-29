import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    this.loading = true; // 👉 Active le patienteur au début
    const body = this.register_form?.value;

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

          this.showSuccessToast('Inscription réussie. Redirection en cours...');

          // Garde le patienteur pendant un petit délai pour l'effet visuel
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          this.loading = false;
          this.showErrorToast(res?.message || "L'inscription a échoué. Veuillez réessayer.");
        }
      },

      error: (err) => {
        console.error('Erreur :', err);
        this.loading = false; // 👉 Désactive le patienteur même en cas d’erreur
        this.showErrorToast("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      },

      complete: () => {
        console.log('Requête terminée');
        // Rien ici, car le patienteur est déjà désactivé dans `next` ou `error`
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
