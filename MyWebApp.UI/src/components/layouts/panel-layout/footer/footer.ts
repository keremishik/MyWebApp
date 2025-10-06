import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="app-footer">
      <div class="footer-inner">
        Web App
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .app-footer {
      width: 100%;
      background-color: #1e3a8a;
      color: #fff;
    }
    .footer-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 10px 16px;
      text-align: center;
      font-size: 13px;
    }
  `]
})
export class Footer { }
