import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
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
    this.clock = Observable.merge(this.click$, Observable.interval(1000))
      .startWith(new Date())
      .scan((acc: Date, curr) => {
        const date = new Date(acc.getTime());
        date.setSeconds(date.getSeconds() + 1);
        return date;
      });
  }
}
