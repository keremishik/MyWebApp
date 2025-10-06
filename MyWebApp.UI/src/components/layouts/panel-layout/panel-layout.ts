import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';

@Component({
  selector: 'panel-layout',
  imports: [Header, Sidebar, Footer],
  template: `
    <div class="panel-container">
      
      <header class="header-container">
        <app-header></app-header>
      </header>

      <aside class="sidebar-container">
        <app-sidebar></app-sidebar>
      </aside>

      <main class="content-container">
        <ng-content></ng-content>
      </main>

      <footer class="footer-container">
        <app-footer></app-footer>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }

    .panel-container {
      display: grid;
      grid-template-columns: 20% 80%;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "header header"
        "sidebar content"
        "footer footer";
      min-height: 100vh;
      background: #f7f9fc;
    }

    .header-container {
      grid-area: header;
     }

    .sidebar-container {
      grid-area: sidebar;
      background: #f4f7fb;
      border-right: 1px solid #e6e9ef;
      overflow: auto;
    }

    .content-container {
      grid-area: content;
      padding: 16px;
      overflow: auto;
      background: #ffffff;
    }

    .footer-container {
      grid-area: footer;
      background: #fff;
    }
  `]
})
export class PanelLayout {

}
