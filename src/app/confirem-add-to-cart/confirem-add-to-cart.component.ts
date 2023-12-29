import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirem-add-to-cart',
  templateUrl: './confirem-add-to-cart.component.html',
  styleUrls: ['./confirem-add-to-cart.component.css']
})
export class ConfiremAddToCartComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfiremAddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
