import { Injectable } from '@angular/core';
import { z } from 'zod';

const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  lactoseFree: z.boolean(),
  glutenFree: z.boolean(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

const recipesSchema = z.array(RecipeSchema);

@Injectable({
  providedIn: 'root'
})
export class MenuBackendService {
  async fetchRecipes() { 
    try {
      const response = await fetch('http://[::1]:3000/recipes');
      const recipes = await response.json();
      return recipesSchema.parse(recipes);
    } catch(err) {
      console.log(err);
      return
    }
  }

  constructor() { }
}
