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
  private apiUrl = 'https://localhost:7025/api/products';

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByPage(page = 1, pageSize = 10): Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getProductAmount(): Observable<number>
  {
    return this.http.get<number>(`${this.apiUrl}/amount`);
  }
}
