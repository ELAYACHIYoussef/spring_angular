import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ImageProccessingService } from '../image-proccessing.service';
import { ShowImageProductDialogComponent } from '../show-image-product-dialog/show-image-product-dialog.component';

import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails: Product[] = [];
  ver: boolean = false;
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discount Price','Product Actual Price','Images','Edit','Delete'];
  constructor(private productService:ProductService,
    public imageDialod:MatDialog,
    private imageProcessingService:ImageProccessingService
    ){}


  ngOnInit() : void {
    this.getAllProducts();
  }

public getAllProducts(){
  this.productService.showProduct()
  .pipe(
    map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
  )
  .subscribe(
    (resp:Product[]) =>{
      console.log(resp);

      this.productDetails = resp;
      
      console.log("ana hnaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--------------------------------------------------- ");
      console.log(this.productDetails);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    }
  );
}

public deleteProduct(productId){
   this.productService.deleteProduct(productId).subscribe(
    (resp) =>{
      this.getAllProducts();
    },(err:HttpErrorResponse)=>{
      console.log(err);
    }
  );
}
 
showImages(product:Product){
   console.log(product);
   this.imageDialod.open(ShowImageProductDialogComponent);
}
}
