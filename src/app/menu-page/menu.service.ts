import { Injectable, inject, signal } from '@angular/core';
import { MenuBackendService } from './menu-backend.service';
import { Recipe } from './menu-backend.service';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  recipes = signal<Recipe[]>([]);
  menuBackendService = inject(MenuBackendService);
  async loadMenu() {
    try {
      this.recipes.set(await this.menuBackendService.fetchRecipes() as Recipe[]);
    } catch(err) {
      console.log(err);
    }
  }
  constructor() { }
}
