import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import "rxjs/add/operator/takeWhile";

import { PowerData } from '../models/PowerData';
import { PowerDataService } from '../services/power-data.service';

import { PlotlyComponent } from '../plotly/plotly.component'

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css'],
  providers: [ PowerDataService ] 
})
export class PowerComponent implements OnInit, OnDestroy {
  
  //public PowerData: PowerData;
  public PlotlyLayout: any;
  public PlotlyData: any;
  public PlotlyOptions: any;
  public DisplayData: boolean = true;
  public Replaying: boolean = false;

  
  @ViewChild('targetChart') 
  private targetChart: PlotlyComponent;

  private alive: boolean; // used to unsubscribe from the Observable timer
                          // when OnDestroy is called.

  private timer: Observable<number>;
  private interval: number;

  constructor(private _powerDataService: PowerDataService) { 
    this.alive = true;
    this.interval = 1000;
    this.timer = Observable.timer(this.interval, this.interval);
  }

  ngOnInit() {

     this.PlotlyLayout = {
      title: "PlotlyAngularDemo",
      height: 500,
      width: 1200
    };

    var baselineTrace = {
      x: [],
      y: [],
      mode: 'lines'
    };

    var targetTrace = {
      x: [],
      y: [],
      mode: 'lines'
    };

    var powerTrace = {
      x: [],
      y: [],
      mode: 'lines+markers'
    };

    this.PlotlyData = [ baselineTrace, targetTrace, powerTrace ];
    
    //Initial get
    this._powerDataService.GetAllPowerData()
      .subscribe(
        data => this.setNewData(data),
        error => console.log(error),
        () => console.log('Get AllPowerData completed for unit'));

    //Timer to pull new dasta
    this.timer
      .takeWhile(() => this.alive)
      .subscribe(() => {
        console.log(this.Replaying);
        if (!this.Replaying) {
          this._powerDataService.GetPowerData()
            .subscribe(
              data => this.setNewData(data),
              error => console.log(error),
              () => {
                console.log('Get PowerData...')
                console.log(this.PlotlyData);
                console.log('Get PowerData completed.')
            });
        }
      })
  }

  private setNewData(data: any) {
    // Output format:
    // Plotly.extendTraces('myDiv', {
    //   x: [[rand()], [rand()], [rand()]],
    //   y: [[rand()], [rand()], [rand()]]
    // }, [0, 1, 2])
    if (data == null) return;

    //Refort data to Plotly format
    let newPlotlyData: any = {x: [[],[],[]], y: [[],[],[]]};

    for (let d of data) {
      newPlotlyData['x'][0].push(d['DateTime']);
      newPlotlyData['y'][0].push(d['Power']);
    }

    this.targetChart.ExtendTraces(newPlotlyData, [0,1,2]);
  }

  isReplaying(replaying: boolean) {
    this.Replaying = replaying;
  }

  ngOnDestroy(): void {
    this.alive = false; // switches your IntervalObservable off
  }
}
