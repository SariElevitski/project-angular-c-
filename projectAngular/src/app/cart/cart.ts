import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Service} from '../service'
import {Product} from '../models/product'


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  public showDetails: boolean = true

cartItems: Product[] = [];

  constructor(private Service: Service) {}

  ngOnInit(): void {
    this.cartItems = this.Service.getCart();
  }

  order()
  {
  }

  

}
