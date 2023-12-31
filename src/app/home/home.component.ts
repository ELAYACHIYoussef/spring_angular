import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageProccessingService } from '../image-proccessing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails = [];
  pageNumber: number = 0;
  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProccessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductHome();
  }

  public searchByKeyWord(searchKey) {
  console.log(searchKey);
  this.pageNumber = 0;
  this.productDetails = [];
  this.getProductHome(searchKey);
  }

  public getProductHome(searchkey: string = "") {
    this.productDetails=[];
    this.productService
      .showProduct(this.pageNumber, searchkey)
      .pipe(
        map((x: Product[]) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          resp.forEach((p) => this.productDetails.push(p));
          //this.productDetails = resp;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  public showProductDetail(productId) {
    if (productId) {
      this.router.navigate(['/productDetails', { productId: productId }]);
    } else {
      console.error('Product ID is not defined.');
    }
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getProductHome();
  }
}
