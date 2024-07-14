import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { MenuFilter, MenuFilterComponent } from "./menu-filter/menu-filter.component";
import { MenuService } from './menu.service';
import { deburr } from 'lodash-es';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [MenuItemComponent, MenuFilterComponent],
  template: `
  <app-menu-filter (filterChanged)="updateFilter($event)" [filteredLength]="displayedRecipes()"></app-menu-filter>
  <div class="flex flex-wrap">
    @for (recipe of recipes(); track $index) {
      <app-menu-item [recipe]="recipe"></app-menu-item>
    }
  </div>
  `,
  styles: ``
})
export class MenuPageComponent implements OnInit {
  ngOnInit(): void {
    this.menuService.loadMenu();
  }
  menuService = inject(MenuService);

  menuFilter = signal<MenuFilter>({ search: '', glutenFree: false, lactoseFree: false });
  updateFilter(filter: MenuFilter) {
    this.menuFilter.set(filter);
  }

  recipes = computed(() => {
    return this.menuService.recipes().filter((recipe) => {
      if (this.menuFilter().glutenFree && !recipe.glutenFree) {
        return false
      }
      if (this.menuFilter().lactoseFree && !recipe.lactoseFree) {
        return false
      }
      if (this.menuFilter().search && !deburr(recipe.name.toLowerCase()).includes(deburr(this.menuFilter().search.toLowerCase()))) {
        return false
      }
      return true
    })
  })

  displayedRecipes = computed(() => {
    return this.recipes().length
  })
}
