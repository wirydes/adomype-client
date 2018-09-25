import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { BaseComponent } from './shared/base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
