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
      let body = this.forgot_form?.value;

      this.auth.ForgotPassword(body).subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          if (res?.status === 'success') {
            if (res.u_email) {
              sessionStorage.setItem('u_email', JSON.stringify(res.u_email));
            } else {
              console.error('User_infos is missing in the response');
            }
            // sessionStorage.setItem('access_token', res.access_token);
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
            Swal.fire({
              title: 'Error!',
              text: res?.message || "L'envoye du code de réinitialisation à echouer",
              icon: 'error',
              confirmButtonText: 'Essayer à nouveau',
              confirmButtonColor: '#ff6c2f'
            }).then(() => {
              location.reload(); // Recharge la page après clic sur "Try Again"
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
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
