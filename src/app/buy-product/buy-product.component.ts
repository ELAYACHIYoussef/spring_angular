import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DialogOrderService } from '../dialog-order.service';
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
    private productService: ProductService,
    private router:Router,
    private dialogOrderService: DialogOrderService
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

  public placeOrder(orderForm: FormGroup) {
   
    if (orderForm.valid) {
     
      if (
        !this.orderDetails.fullName ||
        !this.orderDetails.fullAdresse ||
        !this.orderDetails.contactNumber
      ) {
        
        this.dialogOrderService.openErrorMessageDialog('Please fill in all required fields.');
        return;
      }
  
      this.productService.placeOrder(this.orderDetails).subscribe(
        (resp) => {
          console.log(resp);
          orderForm.reset();
          this.dialogOrderService.openConfirmOrderDialog();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      
      this.dialogOrderService.openErrorMessageDialog('Please fill in all required fields.');
    }
  }
  


 public getQuantityForProduct(productId){
 const filtredProduct=this.orderDetails.orderProductQuantities.filter(
  (productQuantity) =>productQuantity.productId===productId
 );
 return filtredProduct[0].quantity
 }

 public getCalculatedPrice(productId,productDiscountPrice){
  const filtredProduct=this.orderDetails.orderProductQuantities.filter(
    (productQuantity) =>productQuantity.productId===productId
  );
  return filtredProduct[0].quantity * productDiscountPrice;
 }
 public onQuantityChanged(q,productId){
  this.orderDetails.orderProductQuantities.filter(
    (orderProduct) =>orderProduct.productId===productId
  )[0].quantity=q;
 }

 public calculatedGrandTotal(){
  let grandTotal=0;

  this.orderDetails.orderProductQuantities.forEach(
    (productQuantity)=>{
      const price =this.productDtails.filter(product=>product.productId===productQuantity.productId)[0].productDiscountPrice;
      grandTotal+=price*productQuantity.quantity;
    }
  )

  return grandTotal;
 }
}
