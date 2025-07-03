import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
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
      t_city: new FormControl(storedData.t_city || '', Validators.required)
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      console.log('Updated Profile:', updatedData);
      sessionStorage.setItem('teller_infos', JSON.stringify(updatedData));
      this.isEditing = false;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.ngOnInit(); // Re-initialize form
  }
}