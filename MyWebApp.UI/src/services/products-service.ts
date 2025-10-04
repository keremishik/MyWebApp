import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
  private apiUrl = 'http://localhost:7025/api/products';

  private http = inject(HttpClient);

  getProducts(): any
  {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsAsync(): any
  {
    return this.http.get<Product[]>(this.apiUrl).toPromise();
  }
}
