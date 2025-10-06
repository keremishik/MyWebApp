import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="app-header">
      <div class="header-inner">
        <div class="brand">
          <span class="logo">My App</span>
          <!-- <span class="title"></span> -->
        </div>

        <!-- <nav class="nav">
          <a routerLink="/">Home</a>
        </nav> -->

        <div class="actions">
          <button class="logoff">Log Off</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .app-header {
      position: sticky;
      top: 0;
      width: 100%;
      background-color: #1e3a8a;
      color: #fff;
      z-index: 100;
    }

    .header-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      letter-spacing: .3px;
    }

    .logo {
      padding: 6px 10px;
      border-radius: 6px;
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.3);
    }

    .title { font-size: 16px; }

    .nav {
      display: flex;
      gap: 12px;
      flex: 1;
      justify-content: center;
    }

    .nav a {
      color: #eaf2ff;
      text-decoration: none;
      padding: 8px 10px;
      border-radius: 6px;
      transition: background .15s ease-in-out, color .15s ease-in-out;
    }

    .nav a:hover {
      background: rgba(255,255,255,0.14);
      color: #fff;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .actions .logoff {
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.35);
      background: rgba(255,255,255,0.18);
      color: #fff;
      cursor: pointer;
    }

    .actions .logoff:hover {
      background: rgba(255,255,255,0.28);
    }
  `]
})
export class Header {

}
