import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "app/app-routing.module";

import { AppComponent } from './app.component';
import { PlotlyComponent } from './plotly/plotly.component';
import { PowerComponent } from './power/power.component';
import { Configuration } from './app.constants';
import { ZoneComfortComponent } from './zone-comfort/zone-comfort.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoComponent } from './demo/demo.component';
import { IlcComponent } from './ilc/ilc.component';
import { FixTargetComponent } from './fix-target/fix-target.component';

@NgModule({
  declarations: [
    AppComponent,
    PlotlyComponent,
    PowerComponent,
    ZoneComfortComponent,
    PageNotFoundComponent,
    DemoComponent,
    IlcComponent,
    FixTargetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
