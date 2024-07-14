import { Injectable } from '@angular/core';
import { z } from 'zod';
import { Recipe } from './menu-page/menu-backend.service';

const cartItemSchema = z.object({
  cartItemId: z.number(),
  dessertId: z.number(),
  name: z.string(),
  quantity: z.number(),
  price: z.number()
})

const cartSchema = z.object({
  id: z.number(),
  items: z.array(cartItemSchema)
})

export type CartItem = z.infer<typeof cartItemSchema>;


@Injectable({
  providedIn: 'root'
})
export class CartService {

  async fetchCartItems() {
    try {
      const response = await fetch('http://[::1]:3000/cart');
      const recipes = await response.json();
      return cartSchema.parse(recipes).items.sort((a, b) => a.cartItemId - b.cartItemId);
    } catch (err) {
      console.log(err);
      return
    }
  }

  async addToCart(item: Recipe) {
    try {
      const response = await fetch('http://[::1]:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateCartItemQuantity(itemId: number, quantity: number) {
    try {
      const response = await fetch(`http://[::1]:3000/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: itemId, quantity })
      });
      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async removeFromCart(itemId: number) {
    try {
      const response = await fetch(`http://[::1]:3000/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: itemId })
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  getItems() {
    this.fetchCartItems().then(items => items);
  }

  async clearCart(cartItemId: any) {
    try {
      const response = await fetch(`http://[::1]:3000/cart/${cartItemId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
