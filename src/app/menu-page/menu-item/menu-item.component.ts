import { Component, OnInit, input } from '@angular/core';
import { Recipe } from '../menu-backend.service';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
  <div class="border-green-500 border bg-green-100 h-52 w-52">
    <p>{{recipe().name}}</p>
  <p>{{recipe().price | currency: "HUF" : "symbol" : '1.0-0'}}</p>
  <div>
    @if (recipe().glutenFree) {
      <p class="flex m-auto">gluten free: <img srcset="../../../assets/gluten-free-icon-128x.jpg?w=25 25w, ../../../assets/gluten-free-icon-128x.jpg?w=50 50w" sizes="(max-width: 720px) 25px, 50px" alt="lactose_free" class="w-10 rounded-full"></p>
    }
    @if (recipe().lactoseFree) {
      <p class="flex">lactose free: <img srcset="../../../assets/lactose-free-icon-128x.jpg?w=25 25w, ../../../assets/lactose-free-icon-128x.jpg?w=50 50w" sizes="(max-width: 720px) 25px, 50px" alt="lactose_free" class="w-10 rounded-full"></p>
    }
  </div>
  <button type="button" (click)="addToCart()" class="text-[24px] border-green-500 border">Buy</button>
</div>
  `,
  styles: ``
})
export class MenuItemComponent implements OnInit {
  recipe = input.required<Recipe>();

  addToCart() {
    this.cartService.addToCart(this.recipe());
    window.alert('Your product has been added to the cart!');
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
