import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiUrl = 'http://localhost:5183/api/product';

  constructor(private http: HttpClient) {}

  getProducts(
    searchTerm: string,
    categoryId: string | null
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    if (categoryId && categoryId !== '0') {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<Product[]>(this.apiUrl, { params: params });
  }
}
