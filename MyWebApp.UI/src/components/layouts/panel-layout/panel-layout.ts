import { Component } from '@angular/core';

@Component({
  selector: 'panel-layout',
  imports: [],
  template: `
    <div class="panel-container">
      
      <header class="panel-header">
        <div class="panel-header-left">
          Smart Manager
        </div>
        <div class="panel-header-right">
          <div class="panel-user">
            Username
          </div>
        </div>
      </header>

      <aside class="panel-sidebar">
        <div class="panel-sidebar-item">
          <a routerLink="/products" routerLinkActive="active">Products</a>
        </div>
      </aside>

      <main class="panel-content">
        <ng-content></ng-content>
      </main>

      <footer class="panel-footer">
      </footer>
    </div>
  `,
  styles: [`
    .panel-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background-color: #f5f5f5;
    }
    .panel-header-left {
      font-size: 24px;
      font-weight: bold;
    }
    .panel-header-right {
      display: flex;
      align-items: center;
    }
    .panel-user {
      font-size: 18px;
      font-weight: bold;
    }
  `]
})
export class PanelLayout {

}
