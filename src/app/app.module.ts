import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ClockComponent } from '../clock';

import { clock, people } from '../reducers';

@NgModule({
  declarations: [AppComponent, ClockComponent],
  imports: [StoreModule.forRoot({ clock, people }), BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
