import { Component } from '@angular/core';
import { PanelLayout } from '../../components/layouts/panel-layout/panel-layout';

@Component({
  selector: 'app-home',
  imports: [PanelLayout],
  template: `
    <panel-layout>
        <h1>Home Page</h1>
    </panel-layout>
  `
})
export class Home {

}
