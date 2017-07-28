import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlotlyComponent } from './plotly/plotly.component';
import { PowerComponent } from './power/power.component';
import { PowerDataService } from './services/power-data.service';
import { Configuration } from './app.constants';

@NgModule({
  declarations: [
    AppComponent,
    PlotlyComponent,
    PowerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
