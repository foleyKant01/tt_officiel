import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TellersService } from '../../services/tellers/tellers.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {

  data: any;
  teller_infos: any;
  loading = false;
  is_loading: boolean = false;

  profileForm!: FormGroup;
  isEditing: boolean = false;
  userType: 'teller' | 'user' = 'teller'; // Change according to session or API response

  ngOnInit(): void {
    const storedData = JSON.parse(sessionStorage.getItem('teller_infos') || '{}');

    this.profileForm = new FormGroup({
      t_fullname: new FormControl(storedData.t_fullname || '', Validators.required),
      t_username: new FormControl(storedData.t_username || '', Validators.required),
      t_email: new FormControl(storedData.t_email || '', Validators.required),
      t_mobile: new FormControl(storedData.t_mobile || '', Validators.required),
      t_address: new FormControl(storedData.t_address || '', Validators.required),
      t_city: new FormControl(storedData.t_city || '', Validators.required),
      t_uid: new FormControl(storedData.t_uid || '', Validators.required)
    });
  }

  constructor(private router: Router, private http: TellersService) { }


  updateTeller() {
    this.loading = true;
    const body = this.profileForm.value;

    this.http.UpdateTeller(body).subscribe({
      next: (res: any) => {
        console.log('Response:', res);

        if (res?.status === 'success') {
          const updatedData = this.profileForm.value;
          console.log('Updated Profile:', updatedData);
          sessionStorage.setItem('teller_infos', JSON.stringify(updatedData));
          this.isEditing = false;

          this.data = res;

          if (res.teller_infos) {
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

  // UpdateTeller() {
  //   if (this.profileForm.valid) {
  //     const updatedData = this.profileForm.value;
  //     console.log('Updated Profile:', updatedData);
  //     sessionStorage.setItem('teller_infos', JSON.stringify(updatedData));
  //     this.isEditing = false;
  //   }
  // }

  cancelEdit() {
    this.isEditing = false;
    this.ngOnInit(); // Re-initialize form
  }
}