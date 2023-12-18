import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confim-order',
  templateUrl: './dialog-confim-order.component.html',
  styleUrls: ['./dialog-confim-order.component.css']
})
export class DialogConfimOrderComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfimOrderComponent>) {}

  

 public closeDialog(): void {
    this.dialogRef.close();
  }
}
