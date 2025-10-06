import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-products',
  imports: [],
  template: `
    <h1>Products</h1>
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
          </tr>
        }
      </tbody>
    </table>
    <button (click)="previousPage()">Previous Page</button>
    @for (page of pages; track page) {
      <button (click)="goToPage(page)">{{ page }}</button>
    }
    <button (click)="nextPage()">Next Page</button>
    <p>Page {{ page }} of {{ totalPages }}</p>
  `,
  styles: `
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
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
