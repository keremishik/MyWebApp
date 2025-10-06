import { Component } from '@angular/core';

@Component({
  selector: 'panel-layout',
  imports: [],
  template: `
    <div class="panel-container">
      
      <header class="panel-header">
      </header>

      <aside class="panel-sidebar">
      </aside>

      <main class="panel-content">
        <ng-content></ng-content>
      </main>

      <footer class="panel-footer">
      </footer>
    </div>
  `,
  styles: [`
  `]
})
export class PanelLayout {

}
