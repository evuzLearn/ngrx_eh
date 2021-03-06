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
import 'rxjs/add/operator/withLatestFrom';

import { HOUR, SECOND, ADVANCE, RECALL } from '../reducers';

@Component({
  selector: 'app-root',
  template: `
    <input #inputNum type="number" value="0">
    <button (click)="click$.next(inputNum.value)">Update</button>
    <app-clock [time]="time | async"></app-clock>

    <div (click)="person$.next(person)" *ngFor="let person of people | async ">
      {{ person.name }} is in {{ person.time | date:'hh:mm:ss' }}
    </div>

    <button (click)="recall$.next()">Recall</button>
  `,
})
export class AppComponent {
  public click$ = new Subject().map(value => ({ type: HOUR, payload: +value }));
  public second$ = Observable.interval(1000).mapTo({
    type: SECOND,
    payload: 1,
  });
  public time: any;
  public people: any;
  public person$ = new Subject().map(value => ({
    payload: value,
    type: ADVANCE,
  }));
  public recall$ = new Subject();

  constructor(store: Store<any>) {
    this.time = store.select('clock');
    this.people = store.select('people');

    Observable.merge(
      this.click$,
      this.second$,
      this.person$,
      this.recall$
        .withLatestFrom(this.time, (_, y) => y)
        .map(time => ({ type: RECALL, payload: time })),
    ).subscribe(store.dispatch.bind(store));
  }
}
