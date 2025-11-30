import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Product } from './models/product';
import { Observable,throwError, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customization } from './models/customization';

export interface CustomerDto {
  Id?: number;
  FullName: string;
  Email: string;
  Birthday?: Date | null; 
  Phone?: string;
  
}


export interface CartItem extends Product {
    customization?: Customization; // ⬅️ המאפיין האופציונלי של התאמה אישית
    // אופציונלי: ID ייחודי לכל פריט בעגלה
    cartItemId: string;// חשוב להוספת פריט פעמיים
    }

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiUrlProduct = 'http://localhost:5183/api/product';
  private apiUrlCustomer = 'http://localhost:5183/api/customers';

  constructor(private http: HttpClient) {}

  getProducts(
    searchTerm: string | null,
    categoryId: string | null,
    minPrice: number | null,
    maxPrice: number | null
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    if (categoryId && categoryId !== '0') {
      params = params.set('categoryId', categoryId);
    }

    if (minPrice !== null && minPrice >= 0) {
      // המרה למחרוזת לצורך שליחה ב-Query Param
      params = params.set('minPrice', minPrice.toString());
    }

    if (maxPrice !== null && maxPrice >= 0) {
      // המרה למחרוזת לצורך שליחה ב-Query Param
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<Product[]>(this.apiUrlProduct, { params: params });
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrlProduct}/${id}`;
    return this.http
      .get<Product>(url)
      // .pipe(tap((data) => console.log('📦 Data from server:', data)));
  }

   signup(dto: CustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`${this.apiUrlCustomer}/signup`, dto)
      .pipe(catchError(this.handleError));
   }

   emailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<{ exists: boolean }>(`${this.apiUrlCustomer}/exists`, { params })
      .pipe(
        map(res => !!res && !!res.exists),
        catchError(() => of(false))
      );
  }

  getById(id: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrlCustomer}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg = error.error && error.error.message ? error.error.message : error.statusText || 'Server error';
    return throwError(() => new Error(msg));
  }


  addToCart(item: Product | CartItem): void {

    const storageKey = 'cartItems';
      const raw = localStorage.getItem(storageKey) || '[]';
      const cart: CartItem[] = JSON.parse(raw);
      const uniqueId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();

      const cartItem: CartItem = {
        ...item as CartItem,
         cartItemId: uniqueId    
         };
       cart.push(cartItem);
       localStorage.setItem(storageKey, JSON.stringify(cart));
   
  }

//   addToCart(product: Product): void {
//   if (typeof window === 'undefined') return;

//   const raw = localStorage.getItem('cartItems') || '[]';
//   const cart: Product[] = JSON.parse(raw);

//   cart.push(product);
//   localStorage.setItem('cartItems', JSON.stringify(cart));
// }


  getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return []; // SSR - אין localStorage
  }

  const raw = localStorage.getItem('cartItems') || '[]';
  return JSON.parse(raw);
}




}
