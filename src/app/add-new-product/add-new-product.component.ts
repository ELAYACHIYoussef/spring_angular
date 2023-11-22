import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductResolveService } from '../product-resolve.service';
import { FileHandle } from '../_model/file-handle.module';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
  productForm;
  isNewProduct=true;
 product: Product ={
  productId:null,
  productName: "",
  productDescription: "",
  productDiscountPrice:0,
  productActualPrice:0,
  productImages:[]
 }

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private sanitazer:DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private productResolveService: ProductResolveService   ) {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productDescription: [''],
      productDiscountPrice: ['', [Validators.required, Validators.min(0)]],
      productActualPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    this.productResolveService.resolve(this.activatedRoute.snapshot, null).subscribe(
      (product: Product) => {
        this.product = product;
        this.isNewProduct = !product || !product.productId;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  public addProduct(productForm: NgForm){
    const productFormData = this.prepareFromData(this.product);
     return this.productService.addProduct(productFormData).subscribe(
      (Response:Product)=>{
        console.log(Response);
        productForm.reset();
        this.product.productImages=[]
      },
      (Error :HttpErrorResponse)=>{
        console.log(Error);
      },
      
     );
  }
  prepareFromData(product: Product): FormData{
     const formData= new FormData();
     
     formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
     );

     for(var i=0; i<product.productImages.length; i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
     }

     return formData;
  }

  onFileSelected(event) {
   if(event.target.files){
    const file=event.target.files[0];

    const filehandle: FileHandle ={
      file :file,
      url:this.sanitazer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
    this.product.productImages.push(filehandle);
   }
  }

  removeImage(i:number) {
    this.product.productImages.splice(i, 1);
  }
  
  

  fileDropped(filehandle:FileHandle){
    this.product.productImages.push(filehandle);
  }
  getProductDetails(): Product {
    return {
      productId:null,
      productName: "",
      productDescription: "",
      productDiscountPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }

}
