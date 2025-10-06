import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">Menu</div>
      <ul class="sidebar-nav">
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/products">Products</a></li>
      </ul>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .sidebar {
      width: 100%;
      min-width: 220px;
      height: 100%;
      background: #f4f7fb;
      border-right: 1px solid #e6e9ef;
      color: #344054;
    }

    .sidebar-header {
      padding: 14px 16px;
      font-weight: 600;
      background: linear-gradient(180deg, #eef3ff, #e2e8f0);
      border-bottom: 1px solid #e6e9ef;
    }

    .sidebar-nav {
      list-style: none;
      margin: 0;
      padding: 8px;
    }

    .sidebar-nav li a {
      display: block;
      padding: 10px 14px;
      margin: 4px 6px;
      border-radius: 8px;
      color: #374151;
      text-decoration: none;
      transition: background .15s ease, color .15s ease;
    }

    .sidebar-nav li a:hover {
      background: #eaf1ff;
      color: #1e3a8a;
    }
  `]
})
export class Sidebar {

}
