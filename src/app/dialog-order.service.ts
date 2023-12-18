import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfimOrderComponent } from './dialog-confim-order/dialog-confim-order.component';
import { DialogErrorMessageComponent } from './dialog-error-message/dialog-error-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogOrderService {

  constructor(private dialog: MatDialog) {}

  openConfirmOrderDialog(): void {
    this.dialog.open(DialogConfimOrderComponent, {
      width: '400px', 
      data: {} 
    });
  }

  openErrorMessageDialog(message: string): void {
    this.dialog.open(DialogErrorMessageComponent, {
      width: '400px',
      data: { message } 
    });
  }
}
