import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  template: `
  <div class="flex w-full justify-between bg-primary">
    <h1 class="text-[32px] ml-[10px]">Pie Hard</h1>
    <div class="flex">
      <a routerLink="/cart" class="text-[24px] w-100% mt-auto mb-auto">{{"HEADER.CHECKOUT"  | translate}}</a>
      <select name="lanuage" id="lanuage" class="text-[16px] m-auto justify-end ml-[10px] mr-[10px] text-text" (change)="changeLanguage($event)">
        <option value="eng">ENG</option>
        <option value="hu">HU</option>
      </select>
    </div>
</div>
  `,
  styles: ``
})
export class HeaderComponent {
  translateService = inject(TranslateService)

  changeLanguage(event: Event) {
    this.translateService.use((event.target as HTMLSelectElement).value);
  }
}
