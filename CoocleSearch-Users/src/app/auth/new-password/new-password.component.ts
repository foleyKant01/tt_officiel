import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../user/services/auth/auth.service';

// export function passwordMatchValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('new_password')?.value;
//     const confirmPassword = control.get('confirm_password')?.value;

//     if (password && confirmPassword && password !== confirmPassword) {
//       return { passwordMismatch: true };
//     }
//     return null;
//   };
// }

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent implements OnInit{

  infos_user: any; // Stocke les détails du produit
  userEmail: string | undefined;
  data: any;
  is_loading: boolean = false;

  constructor(private router: Router, private http: AuthService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const storedEmail = JSON.parse(sessionStorage.getItem('u_email') || 'null');
    if (storedEmail) {
      console.log('Email trouvé en session:', storedEmail);
      this.userEmail = storedEmail;
    } else {
      console.warn('Aucun email trouvé dans sessionStorage');
    }
  }

  reste_form: FormGroup = new FormGroup({
    temp_password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null, Validators.required),
  });

  saveNewPassword() {

    // if (this.reste_form.invalid) {
    //   this.reste_form.markAllAsTouched();
    //   Swal.fire({
    //     title: 'Erreur',
    //     text: 'Veuillez saisir deux mots de passe identiques',
    //     icon: 'warning',
    //     confirmButtonText: 'OK',
    //     confirmButtonColor: '#ff6c2f'
    //   });
    //   return;
    // }

    let body = this.reste_form?.value;
    body.u_email = this.userEmail;

    this.http.SaveNewPassword(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res?.status === 'success') {
          Swal.fire({
            title: 'Succès!',
            text: 'Mot de passe réinitialisé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['/auth/login']);
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || "La réinitialisation du Mot de passe a échoué",
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
          text: err.error_description || 'Une erreur est survenue',
          icon: 'error',
          confirmButtonText: 'Réessayer',
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
