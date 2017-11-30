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

  constructor(store: Store<any>) {
    this.clock = store.select('clock');

    Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second'),
    ).subscribe(type => {
      store.dispatch({ type });
    });
  }
}
