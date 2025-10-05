import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  productId: number;
  productName: string;
  supplierId?: number | null;
  categoryId?: number | null;
  quantityPerUnit?: string | null;
  unitPrice?: number | null;
  unitsInStock?: number | null;
  unitsOnOrder?: number | null;
  reorderLevel?: number | null;
  discontinued: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7025/api/';
  private productsUrl = `${this.apiUrl}/products`;
  private createUrl = `${this.apiUrl}/create`;

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductsByPage(page = 1, pageSize = 10): Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.productsUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getProductAmount(): Observable<number>
  {
    return this.http.get<number>(`${this.productsUrl}/amount`);
  }

  createProduct(product: Product): Observable<Product[]>
  {
    return this.http.post<Product[]>(this.createUrl, product);
  }
}
