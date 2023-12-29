import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiremAddToCartComponent } from '../confirem-add-to-cart/confirem-add-to-cart.component';
import { ProductResolveService } from '../product-resolve.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {
  product: Product;
  selectProductIndex=0;
  constructor(private productResolveService : ProductResolveService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
    ){
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { product: Product }) => {
      this.product = data.product;
    });
  }

  changeIndex(index){
    this.selectProductIndex=index;
  }   
  buyProduct(productId){
   this.router.navigate(['/buyProduct',
  {isSingleProductCheckout:true,id:productId}
  ]);
  } 

  public addToCart(productId) {
    const dialogRef = this.dialog.open(ConfiremAddToCartComponent, {
      width: '300px',
      data: { productName: this.product.productName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addToCart(productId).subscribe(
          (response) => {
            console.log(response);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
