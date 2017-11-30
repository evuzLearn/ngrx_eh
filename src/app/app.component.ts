import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{ clock | async | date:'dd/MM/y hh:mm:ss' }}</h1>
  `,
})
export class AppComponent {
  click$ = new Subject();
  clock;

  constructor() {
    this.clock = this.click$.map(() => new Date());
  }
}
