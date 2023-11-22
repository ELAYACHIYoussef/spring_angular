import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageProccessingService } from './image-proccessing.service';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService: ProductService, private imageProccessingService: ImageProccessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");

    if (id) {
      return this.productService.getProductById(id).pipe(
        map(product => {
          if (product) {
            return this.imageProccessingService.createImages(product);
          } else {
            console.error(`Product with ID ${id} not found.`);
            return this.getProductDetails();
          }
        }),
        catchError(error => {
          console.error(error); // Log the error
          return of(this.getProductDetails()); // Return default data on error
        })
      );
    } else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails(): Product {
    return {
      productName: "",
      productDescription: "",
      productDiscountPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }
}
