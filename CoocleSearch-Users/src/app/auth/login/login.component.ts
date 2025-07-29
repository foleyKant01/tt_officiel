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
  isLoading: boolean = false;


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

    this.isLoading = true;
    const credentials = this.login_form.value;

    this.auth.LoginUser(credentials).subscribe({
      next: (res: any) => {
        console.log('Réponse du serveur :', res);

        if (res?.status === 'success') {
          const { user_infos, access_token } = res;

          if (user_infos && access_token) {
            sessionStorage.setItem('user_infos', JSON.stringify(user_infos));
            sessionStorage.setItem('access_token', access_token);

            this.isLoading = false; // 👉 Désactiver le patienteur AVANT la redirection
            this.router.navigate(['/user/home']);
            this.showSuccessToast('Connexion réussie !');
          } else {
            this.isLoading = false;
            console.error('Données manquantes dans la réponse :', res);
            this.showErrorToast("Informations d'utilisateur manquantes. Veuillez réessayer.");
          }

        } else {
          this.isLoading = false;
          const message = res?.message || 'Échec de la connexion.';
          console.warn('Connexion échouée :', message);
          this.showErrorToast(message);
        }
      },

      error: (err) => {
        this.isLoading = false;
        console.error('Erreur lors de la requête :', err);
        const errorMessage =
          err?.error?.message ||
          err?.message ||
          'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
        this.showErrorToast(errorMessage);
      },

      complete: () => {
        console.log('Requête de connexion terminée');
        // Ne rien faire ici : isLoading est déjà géré dans next / error
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
