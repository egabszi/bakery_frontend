import { Component, signal } from '@angular/core';
import { AdminService, Ingredients } from '../admin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [NgFor],
  template: `
  <h1>Admin Page</h1>
  `,
  styles: ``
})
export class AdminPageComponent {
  ingredients = signal<Ingredients[]>([]);
  async fetchIngredients() {
    this.ingredients.set(await this.AdminService.fetchIngredients() as Ingredients[]);
  }

  async ngOnInit() {
    this.fetchIngredients()
  }

  addIngredient() {
    this.AdminService.addIngredientElement()
  }

  constructor(
    private AdminService:AdminService) 
    { }
}
