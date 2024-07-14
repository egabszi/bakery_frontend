import { Component, Input, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface MenuFilter {
  search: string;
  glutenFree: boolean;
  lactoseFree: boolean;
}

@Component({
  selector: 'app-menu-filter',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  template: `
  <div class="border">
    <p class="text-[24px]"> {{ "MENU_PAGE.MENU_FILTER.FILTER_HEADER" | translate}}</p>
      <form [formGroup]="filterFormGroup" (submit)="onFilterChanged()">
        <div class="flex">
          <input type="text" formControlName="search" name="search" id="search" [placeholder]="'MENU_PAGE.MENU_FILTER.FILTER_PLACEHOLDER' | translate">
          <div class="flex my-auto mx-5">
            <label for="lactose_free" class="mr-2">{{ 'MENU_PAGE.MENU_FILTER.LACTOSE_FREE' | translate }} </label>
            <input type="checkbox" formControlName="lactoseFree" (change)="onFilterChanged()" name="lactose_free" id="lactose_free" value="lactose_free">
          </div>
          <div class="flex my-auto mx-5">
            <label for="gluten_free" class="mr-2">{{ 'MENU_PAGE.MENU_FILTER.GLUTEN_FREE' | translate }}</label>
            <input type="checkbox" formControlName="glutenFree" (change)="onFilterChanged()" name="gluten_free" id="gluten_free" value="gluten_free">
          </div>
        </div>
        <button type="submit" class="text-[16px] w-100% my-2 bg-blue-100">{{"MENU_PAGE.MENU_FILTER.FILTER" | translate}}</button>
      </form>
    <p [translate]="'MENU_PAGE.MENU_FILTER.LENGHT'" [translateParams]="{foundRecipes: filteredLength()}" class="text-[16px]"></p>
  </div>
    `,
  styles: ``
})

export class MenuFilterComponent {
  filterFormGroup = new FormGroup({
    search: new FormControl(''),
    lactoseFree: new FormControl(false),
    glutenFree: new FormControl(false)
  })
  filterChanged = output<MenuFilter>()

  onFilterChanged() {
    this.filterChanged.emit(this.filterFormGroup.value as MenuFilter)
    console.log(this.filterFormGroup.value)
  }

  filteredLength = input<number>()
}
