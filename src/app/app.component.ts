import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

import { HOUR, SECOND } from '../reducers';

@Component({
  selector: 'app-root',
  template: `
    <input #inputNum type="number" value="0">
    <button (click)="click$.next(inputNum.value)">Update</button>
    <h1>{{ clock | async | date:'dd/MM/y hh:mm:ss' }}</h1>
  `,
})
export class AppComponent {
  click$ = new Subject().map((value) => ({ type: HOUR, payload: +value }));
  second$ = Observable.interval(1000).mapTo({ type: SECOND, payload: 1 });
  clock;

  constructor(store: Store<any>) {
    this.clock = store.select('clock');

    Observable.merge(this.click$, this.second$).subscribe(
      store.dispatch.bind(store),
    );
  }
}
