import { Routes } from '@angular/router';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { CartComponent } from './cart/cart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [{
    path: '',
    component: MenuPageComponent
},
{
    path: 'cart',
    component: CartComponent
},
{
    path: 'admin',
    component: AdminPageComponent
}
];
