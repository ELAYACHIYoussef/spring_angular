import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  showTable=false;
  showMoreProduct=false;
  pageNumber: number =0;
  // Dans votre fichier .ts
displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discount Price', 'Product Actual Price', 'Actions'];
  constructor(private productService:ProductService,
    public imageDialod:MatDialog,
    private imageProcessingService:ImageProccessingService,
    private router:Router
    ){}


  ngOnInit() : void {
    this.getAllProducts();
  }

public getAllProducts(){
  this.showTable=false;
  this.productService.showProduct(this.pageNumber)
  .pipe(
    map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
  )
  .subscribe(
    (resp:Product[]) =>{
      console.log(resp);
     
      resp.forEach(p=>this.productDetails.push(p));
      //this.productDetails = resp;
      this.showTable=true;

      if(resp.length ==12){
        this.showMoreProduct=true;
      }else{
        this.showMoreProduct=false;
      }
      console.log("ana hnaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--------------------------------------------------- ");
      console.log(this.productDetails);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    }
  );
}

public deleteProduct(productId){
  console.log(productId)
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
   this.imageDialod.open(ShowImageProductDialogComponent,{
    data: {
        images:product.productImages
    },
    height:'500px',
    width:'800px'
   });
}

public editProductDetails(productId){
  console.log(productId);
  this.router.navigate(['/addNewProduct',{productId:productId}])
}

public loadMoreProduct(){
this.pageNumber=this.pageNumber+1;
this.getAllProducts();
}

}
