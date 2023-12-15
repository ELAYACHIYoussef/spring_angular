import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResolveService } from '../product-resolve.service';
import { Product } from '../_model/product.model';

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
    private router: Router
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
  buyProduct(){
   this.router.navigate(['/buyProduct']);
  } 
}
