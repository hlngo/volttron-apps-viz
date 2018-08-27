import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import "rxjs/add/operator/takeWhile";

import { PowerData } from '../models/PowerData';
import { PowerDataService } from '../services/power-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { PlotlyComponent } from '../plotly/plotly.component'
import * as moment from 'moment';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  providers: [ AuthenticationService ] 
})
export class DemoComponent implements OnInit, OnDestroy {

  public SecureToken: string;

  title1 = 'PNNL Building 350 - Transactive Control';
  title2 = 'Intelligent Load Control'

  constructor(private _authService: AuthenticationService) {  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }

}
