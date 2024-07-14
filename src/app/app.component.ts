import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, HeaderComponent],
  template: `
  <main class="main">
  <div class="content">

  </div>
  </main>

  <app-header></app-header>
  <router-outlet />
  `,
  styles: ``
})
export class AppComponent {
  title = 'angular_project';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang('en');
  }
}
