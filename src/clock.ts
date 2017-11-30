import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `
    <h1>{{ time | date:'dd/MM/y hh:mm:ss' }}</h1>
  `,
})
export class ClockComponent {
  @Input() time: Date;
}
