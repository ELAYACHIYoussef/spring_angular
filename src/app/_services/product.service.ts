import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }


  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("http://localhost:9095/addNewProduct", product)
  }

  public showProduct(pageNumber, searchKey: string = ""): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:9095/getAllProduct?pageNumber=" + pageNumber + "&searchKey=" + searchKey);
  }
  

  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:9095/deletProductDetails/" + productId)
  }
  public updateProduct(productId: number, product: Product) {
    return this.httpClient.put("http://localhost:9095/updateProduct/" + productId, product);
  }

  public getProductById(productId) {
    return this.httpClient.get<Product>("http://localhost:9095/getProductById/" + productId);
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("http://localhost:9095/getProductDetails/" + isSingleProductCheckout + "/" + productId)
  }
  public placeOrder(orderDetails: OrderDetails){
    return this.httpClient.post("http://localhost:9095/placeOrder",orderDetails)
  }


 
}
