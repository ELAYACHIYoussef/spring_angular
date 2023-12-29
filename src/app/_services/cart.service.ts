import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  public addToCart(productId){
    return this.httpClient.get("http://localhost:9095/addToCart/"+productId)
  }

  public getCartDetails(){
    return this.httpClient.get("http://localhost:9095/getCartDetails");
  }
}
