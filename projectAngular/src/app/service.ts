import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiUrl = 'http://localhost:5183/api/product';

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

    return this.http.get<Product[]>(this.apiUrl, { params: params });
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Product>(url)
      // .pipe(tap((data) => console.log('📦 Data from server:', data)));
  }
}
