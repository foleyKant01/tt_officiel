import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  data: any;
  teller_infos: any;
  loading = false;
  isEditing: boolean = false;


  ngOnInit(): void {
    const storedData = JSON.parse(sessionStorage.getItem('admin_infos') || '{}');

    this.profileForm = new FormGroup({
      ad_fullname: new FormControl(storedData.ad_fullname || '', Validators.required),
      ad_username: new FormControl(storedData.ad_username || '', Validators.required),
      ad_mobile: new FormControl(storedData.ad_mobile || '', Validators.required),
      ad_email: new FormControl(storedData.ad_email || '', Validators.required),
      ad_uid: new FormControl(storedData.ad_uid || '', Validators.required)

    });
  }

  constructor(private router: Router, private http: AuthService) { }

  updateAdmin() {
    this.loading = true;
    const body = this.profileForm.value;

    this.http.UpdateAdmin(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);

        if (res?.status === 'success') {
          const updatedData = this.profileForm.value;
          console.log('Updated Profile:', updatedData);
          sessionStorage.setItem('admin_infos', JSON.stringify(updatedData));
          this.isEditing = false;

          this.data = res;

          if (res.admin_infos) {
            this.showSuccessToast('Mise à jour réussie');
          } else {
            this.showErrorToast("Erreur : données incomplètes");
          }
        } else {
          this.showErrorToast("Échec de la mise à jour. Veuillez réessayer.");
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

  cancelEdit() {
    this.isEditing = false;
    this.ngOnInit(); // Re-initialize form
  }

}
