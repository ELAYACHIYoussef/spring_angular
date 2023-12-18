import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-message',
  templateUrl: './dialog-error-message.component.html',
  styleUrls: ['./dialog-error-message.component.css']
})
export class DialogErrorMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
