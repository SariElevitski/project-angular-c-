import { Routes } from '@angular/router';
import { Home } from './home/home'
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { About } from './about/about';

export const routes: Routes = [

   {path:'' , component: Home},
   {path:'home' , component: Home},
   {path:'shopping' , component: Products},
   {path:'cart' , component: Cart},
   {path:'about' , component: About},


];
