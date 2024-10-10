import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageModeService } from '../../services/message-mode/message-mode.service';

declare const bootstrap: any;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isWhatsAppActive = false;
  isSmsActive = false;
  sendModeId: string | null = null;
  data: any;
  mode_res: any = {};

  constructor(private message: MessageModeService) {}

  ngOnInit(): void {
    this.loadSendMode();
  }

  loadSendMode(): void {
    this.message.getSendMode({}).subscribe({
      next: (res: any) => {
        if (res?.send_mode && res.send_mode.length > 0) {
          this.sendModeId = res.send_mode[0].send_mode_id;
          const mode = res.send_mode[0].send_mode;
          console.log('Mode trouvé:', mode); 
          this.isWhatsAppActive = mode === 'whatsapp';
          this.isSmsActive = mode === 'sms';
          console.log('isWhatsAppActive:', this.isWhatsAppActive);
          console.log('isSmsActive:', this.isSmsActive);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete() {
        console.log('loadSendMode complete');
      },
    });
  }

  createSendMode(): void {
    if (this.sendModeId) {
      this.showErrorToast('A send mode already exists. You cannot create a new one.');
      return;
    }
    const mode = this.isWhatsAppActive ? 'whatsapp' : 'sms';
    let body = {
      send_mode: mode,
    };
    this.message.SendMode(body).subscribe({
      next: (res: any) => {
        this.mode_res = res?.user_info;
        this.sendModeId = res.user_info.send_mode_id; 
        this.loadSendMode(); 
        this.showSuccessToast('Send mode created successfully!');
      },
      error: (err: any) => {
        console.log(err);
        this.showErrorToast('Failed to create send mode.');
      },
      complete() {
        console.log('Send mode creation complete');
      },
    });
  }

  updateSendMode(): void {
    if (!this.sendModeId) {
      alert("The shipping mode must first be created.");
      return;
    }
    const mode = this.isWhatsAppActive ? 'whatsapp' : 'sms';
    let body = {
      send_mode_id: this.sendModeId,
      send_mode: mode,
    };
    this.message.UpdateSendMode(body).subscribe({
      next: (res: any) => {
        this.mode_res = res?.user_info;
        this.loadSendMode();
        this.showSuccessToast('Send mode updated successfully!');
      },
      error: (err: any) => {
        console.log(err);
        this.showErrorToast('Sending mode update failed.');
      },
      complete() {
        console.log('Complete');
      },
    });
  }

  toggleMode(mode: 'whatsapp' | 'sms'): void {
    if (mode === 'whatsapp') {
      this.isWhatsAppActive = true;
      this.isSmsActive = false;
    } else {
      this.isWhatsAppActive = false;
      this.isSmsActive = true;
    }
    this.updateSendMode();
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
}
