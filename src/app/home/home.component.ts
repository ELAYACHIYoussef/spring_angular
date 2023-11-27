import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageProccessingService } from '../image-proccessing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  productDetails= [];

  constructor(private productService: ProductService,
    private imageProcessingService:ImageProccessingService,
    private router:Router
    ){

  }
  ngOnInit(): void {
    this.getProductHome();
  }
  
  public getProductHome() {
    this.productService.showProduct()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp); // Vérifiez ici les données reçues
          this.productDetails = resp;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  public showProductDetail(productId) {
    this.router.navigate(['/productDetails',{productId:productId}])
  }
}
