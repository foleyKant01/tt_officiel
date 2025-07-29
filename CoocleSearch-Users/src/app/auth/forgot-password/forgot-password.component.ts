import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../user/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  data: any;
  is_loading: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  forgot_form: FormGroup = new FormGroup({
    u_email: new FormControl('', [Validators.required, Validators.email])
  });

  forgotPassword() {
    if (this.forgot_form.valid) {
      this.is_loading = true; // 👉 Active le patienteur dès le début

      const body = this.forgot_form.value;

      this.auth.ForgotPassword(body).subscribe({
        next: (res: any) => {
          console.log('Response:', res);

          if (res?.status === 'success') {
            if (res.u_email) {
              sessionStorage.setItem('u_email', JSON.stringify(res.u_email));
            } else {
              console.error('u_email is missing in the response');
            }
            this.is_loading = false; // 👉 Désactive le patienteur avant la navigation
            Swal.fire({
              title: 'Succès!',
              text: 'Code de réinitialisation envoyé avec succès!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#ff6c2f'
            }).then(() => {
              this.router.navigate(['/auth/new-password']);
            });

          } else {
            this.is_loading = false; // 👉 Désactive le patienteur ici aussi
            Swal.fire({
              title: 'Erreur!',
              text: res?.message || "L'envoi du code de réinitialisation a échoué.",
              icon: 'error',
              confirmButtonText: 'Essayer à nouveau',
              confirmButtonColor: '#ff6c2f'
            })
          }
        },

        error: (err) => {
          console.log('Error:', err);
          this.is_loading = false;
          Swal.fire({
            title: 'Erreur!',
            text: err?.error_description || 'Une erreur est survenue. Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'Réessayer',
            confirmButtonColor: '#ff6c2f'
          });

        },

        complete: () => {
          console.log('Requête terminée');
          // ⚠️ Rien ici, car Swal ou la navigation s'en charge.
        }
      });

    }
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
