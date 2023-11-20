import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService:ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{
   const id=route.paramMap.get("productId");
   if(id){
   return this.productService.getProductById(id);
   }else{
    return of(this.getProductDetais());
   }
  }

  getProductDetais(){
    return {
      productName: "",
  productDescription: "",
  productDiscountPrice:0,
  productActualPrice:0,
  productImages:[]
    }
  }
}
