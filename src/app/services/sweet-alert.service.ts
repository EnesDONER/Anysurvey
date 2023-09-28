import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  async showInfo(title: string, text: string) {
    await Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Okey'
    });
  }

  async showInputPrompt(title: string, text: string) {
    const { value } = await Swal.fire({
      title: title,
      text: text,
      input: 'text',
      inputPlaceholder: 'Wallet Address',
      showCancelButton: true,
      confirmButtonText: 'Okey',
      cancelButtonText: 'Cancel'
    });

    return value;
  }

  // Diğer bildirimler ve modal fonksiyonları buraya eklenebilir
}
