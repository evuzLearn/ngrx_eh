import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ clock | async | date:'dd/MM/y hh:mm:ss' }}</h1>
  `,
})
export class AppComponent {
  clock = Observable.interval(1000).map(() => new Date());

  constructor() {
    this.clock.subscribe(console.log.bind(console));
  }
}
