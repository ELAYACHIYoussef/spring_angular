import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.module';
@Component({
  selector: 'app-show-image-product-dialog',
  templateUrl: './show-image-product-dialog.component.html',
  styleUrls: ['./show-image-product-dialog.component.css']
})
export class ShowImageProductDialogComponent implements OnInit{

   constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {
   this.receiveImages();
  }

  receiveImages(){
    console.log(this.data)
  }
  
}
