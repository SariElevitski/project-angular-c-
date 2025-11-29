import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Signup } from './signup/signup';
import { ProductDetails } from './product-details/product-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  {path: 'shopping',component: Products,// 👈 הוספת המאפיין הזה
 runGuardsAndResolvers: 'always' } ,
  { path: 'cart', component: Cart },
  { path: 'signup', component: Signup },
  { path: 'product/:id', component: ProductDetails}
];
