import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  orderForm: FormGroup;
  productDtails: Product[]=[];
  orderDetails: OrderDetails ={
    fullName: '',
    fullAdresse: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantities: []
  }
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
    ){
    this.orderForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      fullAdresse: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      alternateContactNumber: ['']
    });
  }
  ngOnInit(): void {
    this.productDtails=this.activatedRoute.snapshot.data['productDtails'];
    this.productDtails.forEach(
      x=>this.orderDetails.orderProductQuantities.push(
      {productId: x.productId, quantity: 1}
      )
    );
    console.log(this.orderDetails)
    console.log(this.productDtails)
  }

  public placeOrder(orderForm: FormGroup){
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset(); 
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
