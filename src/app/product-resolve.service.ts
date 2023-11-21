import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ImageProccessingService } from './image-proccessing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService:ProductService,
    private imageProccessingService:ImageProccessingService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{
   const id=route.paramMap.get("productId");
   if(id){
   return this.productService.getProductById(id)
    .pipe(
      map(p=>this.imageProccessingService.createImages(p))
    )
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
