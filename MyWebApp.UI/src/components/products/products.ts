import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { PanelLayout } from '../layouts/panel-layout/panel-layout';

@Component({
  selector: 'app-products',
  imports: [PanelLayout],
  template: `
    <panel-layout>
        <div class="table-container">
          <div class="table-header">
            <h1>Products</h1>
          </div>
          <div class="table-content">
            <table>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Supplier ID</th>
                <th>Category ID</th>
                <th>Quantity Per Unit</th>
                <th>Unit Price</th>
                <th>Units In Stock</th>
                <th>Units On Order</th>
                <th>Reorder Level</th>
                <th>Discontinued</th>
            </tr>
            <tbody>
              @for (product of products; track product.productId) {
                <tr>
                  <td>{{ product.productId }}</td>
                  <td>{{ product.productName }}</td>
                  <td>{{ product.supplierId }}</td>
                  <td>{{ product.categoryId }}</td>
                  <td>{{ product.quantityPerUnit }}</td>
                  <td>{{ product.unitPrice }}</td>
                  <td>{{ product.unitsInStock }}</td>
                  <td>{{ product.unitsOnOrder }}</td>
                  <td>{{ product.reorderLevel }}</td>
                  <td>{{ product.discontinued }}</td>
                  <td>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <button (click)="previousPage()">Previous Page</button>
          @for (page of pages; track page) {
            <button (click)="goToPage(page)">{{ page }}</button>
          }
          <button (click)="nextPage()">Next Page</button>
          <p>Page {{ page }} of {{ totalPages }}</p>
        </div>
      </div>
    </panel-layout>
  `,
  styles: `
    :host {
      display: block;
      padding: 16px;
      background: #f7f9fc;
    }

    .table-container {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .table-header {
      padding: 16px 20px;
      border-bottom: 1px solid #e6e9ef;
    }

    .table-header h1 {
      margin: 0;
      font-size: 20px;
      color: #1f2937;
    }

    .table-content {
      max-height: 70vh;
      overflow: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th, td {
      padding: 12px 14px;
      border-bottom: 1px solid #eef1f6;
    }

    th {
      position: sticky;
      top: 0;
      background: #f3f6fb;
      color: #374151;
      font-weight: 600;
      text-align: left;
      box-shadow: 0 1px 0 rgba(0,0,0,0.04);
      z-index: 2;
    }

    tbody tr:nth-child(odd) td {
      background: #fafbff;
    }

    tbody tr:hover td {
      background: #eef5ff;
    }

    td {
      color: #4b5563;
    }

    .table-pagination {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid #e6e9ef;
    }

    .table-pagination p {
      margin-left: auto;
      color: #6b7280;
      font-size: 13px;
    }

    .table-pagination button {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #ffffff;
      color: #374151;
      cursor: pointer;
      transition: all .15s ease-in-out;
    }

    .table-pagination button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
      transform: translateY(-1px);
    }

    .table-pagination button:active {
      transform: translateY(0);
    }

    .table-pagination button:disabled {
      opacity: .5;
      cursor: not-allowed;
    }

    .table-pagination button.active {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }
  `
})

export class Products implements OnInit 
{
  private productsService = inject(ProductsService);
  products: any[] = [];
  page = 1;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];

  getPages(): number[]
  {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit()
  {
    this.loadProducts();
  }

  loadProducts()
  {
    this.productsService.getProductsByPage(this.page, this.pageSize).subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
      this.productsService.getProductAmount().subscribe(
        (amount: number) => {
          this.totalPages = Math.ceil(amount / this.pageSize);
          this.pages = this.getPages();
        }
      );
  }

  nextPage()
  {
    if (this.page < this.totalPages)
    {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage()
  {
    if (this.page > 1)
    {
      this.page--;
      this.loadProducts();
    }
  }

  goToPage(page: number)
  {
    this.page = page;
    this.loadProducts();
  }
}
