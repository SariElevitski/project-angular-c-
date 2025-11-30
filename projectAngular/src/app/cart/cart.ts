import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Service} from '../service'
import {Product} from '../models/product'
import {CartItem} from '../service'
import { ReactiveFormsModule, FormGroup,FormControl,Validators} from '@angular/forms'


@Component({
  selector: 'app-cart',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  public showDetails: boolean = true
  cartItems: CartItem[] = [];
  public myForm! : FormGroup;


  constructor(private Service: Service) {}

  ngOnInit(): void {
    this.cartItems = this.Service.getCart();
    this.orderDetails();
  }

  orderDetails()
  {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),

      email: new FormControl('', [Validators.required, Validators.email]),

      address: new FormGroup({
        city: new FormControl('', Validators.required),
        house_number: new FormControl('', Validators.required)
      }),
    });
  
  }

  

}
