import { Component, OnInit, signal } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
  <a routerLink="/" class="text-[32px]">Go Back</a>
  <h3>Cart</h3>
  
  <div class="cart-item">
    <span *ngFor="let item of items()">
      <h1>{{item.name}}</h1>
      <p>{{item.price | currency: "HUF" : "symbol" : '1.0-0'}}</p>
      <div class="flex">
        <button (click)="updateCartItemQuantity(item.cartItemId, item.quantity - 1 )">-</button>
        <p class="ml-[10px] mr-[10px]">{{item.quantity}}</p>
        <button (click)="updateCartItemQuantity(item.cartItemId, item.quantity + 1)">+</button>
      </div>
      <button (click)="deleteCartItem(item.cartItemId)">Remove</button>
    </span>
    </div>
  
    `,
  styles: ``
})

export class CartComponent implements OnInit {
  items = signal<CartItem[]>([]);

  async fetchCartItems() {
    this.items.set(await this.cartService.fetchCartItems() as CartItem[]);
  }
  async ngOnInit() {
    this.fetchCartItems()
  }

  updateCartItemQuantity(itemId: number, quantity: number) {
    if(quantity < 1) return
    this.cartService.updateCartItemQuantity(itemId, quantity)
    .then(()=> this.fetchCartItems())
  }

  deleteCartItem(itemId: number) {
    this.cartService.removeFromCart(itemId)
    .then(() =>this.fetchCartItems());
  }

  constructor(
    private cartService: CartService
  ) { }
}
