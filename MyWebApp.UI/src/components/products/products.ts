import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../../services/products-service';
import { PanelLayout } from '../layouts/panel-layout/panel-layout';

@Component({
  selector: 'app-products',
  imports: [PanelLayout, FormsModule],
  template: `
    <panel-layout>
      @if (productFormVisible) {
        <div class="modal-overlay">
          <div class="modal" role="dialog" aria-modal="true">
            <div class="modal-header">
              <h2>Add Product</h2>
              <button class="close-btn" type="button" (click)="closeProductForm()">×</button>
            </div>
            <div class="modal-body">
              <form #productForm="ngForm" (ngSubmit)="addProduct()">
                <div class="form-grid">
                  <div class="field">
                    <label for="productName">Product Name</label>
                    <input id="productName" name="productName" [(ngModel)]="newProduct.productName" required>
                  </div>

                  <div class="field">
                    <label for="supplierId">Supplier ID</label>
                    <input id="supplierId" name="supplierId" type="number" [(ngModel)]="newProduct.supplierId" required>
                  </div>

                  <div class="field">
                    <label for="categoryId">Category ID</label>
                    <input id="categoryId" name="categoryId" type="number" [(ngModel)]="newProduct.categoryId" required>
                  </div>

                  <div class="field">
                    <label for="quantityPerUnit">Quantity Per Unit</label>
                    <input id="quantityPerUnit" name="quantityPerUnit" [(ngModel)]="newProduct.quantityPerUnit" required>
                  </div>

                  <div class="field">
                    <label for="unitPrice">Unit Price</label>
                    <input id="unitPrice" name="unitPrice" type="number" step="0.01" [(ngModel)]="newProduct.unitPrice" required>
                  </div>

                  <div class="field">
                    <label for="unitsInStock">Units In Stock</label>
                    <input id="unitsInStock" name="unitsInStock" type="number" [(ngModel)]="newProduct.unitsInStock" required>
                  </div>

                  <div class="field">
                    <label for="unitsOnOrder">Units On Order</label>
                    <input id="unitsOnOrder" name="unitsOnOrder" type="number" [(ngModel)]="newProduct.unitsOnOrder" required>
                  </div>

                  <div class="field">
                    <label for="reorderLevel">Reorder Level</label>
                    <input id="reorderLevel" name="reorderLevel" type="number" [(ngModel)]="newProduct.reorderLevel" required>
                  </div>

                  <div class="field checkbox-field">
                    <label for="discontinued">Discontinued</label>
                    <input id="discontinued" name="discontinued" type="checkbox" [(ngModel)]="newProduct.discontinued">
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" [disabled]="!productForm.valid">Save</button>
                  <button type="button" (click)="closeProductForm()">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      <button type="button" (click)="showProductForm()">Add Product</button>
      <div class="table-container">
        <div class="table-header">
          <h1>Products</h1>
          @if (errorMessage) {
            <p class="error-message">{{ errorMessage }}</p>
          }
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
                <th>Actions</th>
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
                    <button (click)="editProduct(product)">Edit</button>
                    <button (click)="deleteProduct(product.productId)">Delete</button>
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
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 640px;
      overflow: hidden;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e6e9ef;
    }
    .modal-body {
      padding: 16px 20px;
    }
    .close-btn {
      border: none;
      background: transparent;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }

    /* Dikey ve düzenli form hizalaması */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 12px;
    }
    .field label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      color: #374151;
    }
    .field input,
    .field select,
    .field textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #fff;
      font-size: 14px;
    }
    .checkbox-field {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 12px;
    }
    .form-actions button {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #ffffff;
      color: #374151;
      cursor: pointer;
      transition: all .15s ease-in-out;
    }
    .form-actions button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
      transform: translateY(-1px);
    }
  `
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  private readonly title = 'Products';
  products: any[] = [];
  newProduct: Product = {
    productName: '',
    supplierId: null,
    categoryId: null,
    quantityPerUnit: null,
    unitPrice: null,
    unitsInStock: null,
    unitsOnOrder: null,
    reorderLevel: null,
    discontinued: false
  };
  page = 1;
  pageSize = 10;
  totalPages = 0;
  pages: number[] = [];
  productFormVisible = false;
  errorMessage: string | null = null;

  getPages()
  {
    this.productsService.getProductAmount().subscribe(
      (amount: number) => {
        this.totalPages = Math.ceil(amount / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
    );
  }

  ngOnInit()
  {
    this.loadProducts();
    this.getPages();
  }

  loadProducts()
  {
    this.productsService.getProductsByPage(this.page, this.pageSize).subscribe(
      (products: any[]) => {
        this.products = products;
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

  deleteProduct(productId: number)
  {
    this.errorMessage = null;
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        // Try to extract server-provided message, fallback to generic
        const serverMessage = err?.error?.message;
        this.errorMessage = serverMessage ?? 'Delete failed: product is in use by orders or not found.';
      }
    });
  }

  editProduct(product: Product)
  {
    
  }

  createProduct(product: Product)
  {
    this.productsService.createProduct(product).subscribe(() => { 
      this.loadProducts();
      this.newProduct = {
        productName: '',
        supplierId: null,
        categoryId: null,
        quantityPerUnit: null,
        unitPrice: null,
        unitsInStock: null,
        unitsOnOrder: null,
        reorderLevel: null,
        discontinued: false
      };
      this.closeProductForm();
    });
  }

  addProduct()
  {
    this.createProduct(this.newProduct);
  }

  showProductForm()
  {
    this.productFormVisible = true;
  }

  closeProductForm()
  {
    this.productFormVisible = false;
  }
}
