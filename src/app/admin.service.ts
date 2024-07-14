import { Injectable } from '@angular/core';
import { z } from 'zod';

const IngredientsSchema = z.object({
  id: z.number(),
  name: z.string()
})

export type Ingredients = z.infer<typeof IngredientsSchema>;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  async fetchIngredients() {
    try {
      const response = await fetch('http://[::1]:3000/ingredients');
      const ingredients = await response.json();
      return ingredients
    } catch (err) {
      console.log(err);
      return
    }
  }

  addIngredientElement() {
    const option = document.createElement('option')
    const select = document.getElementById('ingredientselect') as HTMLSelectElement
  }
}
