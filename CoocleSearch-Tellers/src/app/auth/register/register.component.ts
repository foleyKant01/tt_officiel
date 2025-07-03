import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

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

  registerTellerForm: FormGroup = new FormGroup({
    t_fullname: new FormControl(null, Validators.required),
    t_username: new FormControl(null, Validators.required),
    t_email: new FormControl(null, Validators.required),
    t_mobile: new FormControl(null, Validators.required),
    t_address: new FormControl(null, Validators.required),
    t_city: new FormControl(null, Validators.required),
    t_password: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private auth: AuthService) { }

  createTeller() {
    this.loading = true;
    const body = this.registerTellerForm.value;

    this.auth.CreateTeller(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);

        if (res?.status === 'success') {
          this.data = res;

          if (res.teller_infos) {
            sessionStorage.setItem('teller_infos', JSON.stringify(res.teller_infos));
            this.showSuccessToast('Création réussie');

            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 1000);
          } else {
            this.showErrorToast("Erreur : données incomplètes");
          }
        } else {
          this.showErrorToast("Échec de l'inscription. Veuillez réessayer.");
        }
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.showErrorToast("Une erreur est survenue. Veuillez réessayer.");
      },
      complete: () => {
        this.loading = false; // Assure que le loading est désactivé à la fin
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
