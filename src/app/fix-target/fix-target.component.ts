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

import { PlotlyComponent } from '../plotly/plotly.component'
import * as moment from 'moment';

@Component({
  selector: 'app-fix-target',
  templateUrl: './fix-target.component.html',
  styleUrls: ['./fix-target.component.css'],
  providers: [ PowerDataService, AuthenticationService ] 
})
export class FixTargetComponent implements OnInit {
  @Input() secureToken: any;
  @Input() viewDate: string;
  @Input() func: string;
  @Input() season: string;
  @Input() id: string;

  @ViewChild('fixTargetChart') 
  private targetChart: PlotlyComponent;

  //public PowerData: PowerData;
  public PlotlyLayout: any;
  public PlotlyData: any;
  public PlotlyOptions: any;
  public DisplayData: boolean = false;
  public Replaying: boolean = false;
  public PlotlyId: string;

  private alive: boolean; // used to unsubscribe from the Observable timer
                          // when OnDestroy is called.

  private timer: Observable<number>;
  private interval: number;


  constructor(private _powerDataService: PowerDataService, private _authService: AuthenticationService) { 
    this.alive = true;
    this.interval = 1000;
    this.timer = Observable.timer(this.interval, this.interval);
  }

  ngOnInit() {
    this.PlotlyId = this.id;
    this.PlotlyLayout = {
      title: "",
      height: 600,
      width: 1420,
      margin: {
        l: 80,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      },
      xaxis: {
        title: '<b>Time</b>',
        tickformat: "%-I %p",
        nticks: 30,
        titlefont: {
          size: 16
        },
        tickfont: {
          size: 14
        }
      },
      yaxis: {
        title: '<b>Whole Building Electricity Consumption (kWh)</b>',
        range: [0, 200],
        zerolinewidth: 3,
        titlefont: {
          size: 16
        },
        tickfont: {
          size: 14
        }
      },
      legend: {
        x: 0.9, 
        y: 1,
        font: {
          size: 14
        }
      }
    };

    var baselineTrace = {
      name: 'Expected',
      x: [],
      y: [],
      mode: 'lines',
      'line': {
        width: 3
      }
    };

    var targetTrace = {
      name: 'Target',
      x:[],
      y: [147, 147],
      mode: 'lines',
      'line': {
        width: 3
      }
    };

    var powerTrace = {
      name: 'Actual',
      x: [],
      y: [],
      mode: 'lines',
      'line': {
        width: 3
      }
    };

    this.PlotlyData = [ baselineTrace, targetTrace, powerTrace];
    
    //Initial get
    this._powerDataService.GetAllPowerWithoutILC(this.viewDate, this.func, this.season)
      .takeWhile(() => this.alive)
      .subscribe(
        data => this.setNewData(data, 0),
        error => console.log(error.json().error),
        () => console.log('Get GetAllPowerWithoutILC completed.'));

    this._powerDataService.GetAllPowerWithILC(this.viewDate, this.func, this.season)
      .takeWhile(() => this.alive)
      .subscribe(
        data => this.setNewData(data, 2),
        error => console.log(error.json().error),
        () => console.log('Get GetAllPowerWithILC completed.'));

  }


  private setNewData(data: any, traceIdx: number) {
    // Output format:
    // Plotly.extendTraces('myDiv', {
    //   x: [[rand()], [rand()], [rand()]],
    //   y: [[rand()], [rand()], [rand()]]
    // }, [0, 1, 2])
    if (data == null || data['result']) return;

    //Refort data to Plotly format
    let newPlotlyData: any = {x: [[],[],[]], y: [[],[],[]]};

    //for (let d of data['result']) {
    //Angular is different from JS. The getTime() in JS return UTC while getTime in Angular returns Local
    //let curDateTime = (new Date).getTime();
    let curDateTime = new Date;
    
    for (let d of data) {
      if (traceIdx != 1) {
        newPlotlyData['x'][traceIdx].push(d['ts']);
        newPlotlyData['y'][traceIdx].push(d['value']);

        if (traceIdx == 0) {
          //x: ['2017-08-10T00:00:00.000000Z','2017-08-11T00:00:00.000000Z'],
          newPlotlyData['x'][1].push(d['ts']);
          newPlotlyData['y'][1].push(147);
        }
      }
      else {
        //Moment parse non-offset string to UTC by default. Set format to parse to local.
        let myMoment: moment.Moment = moment(d['ts'], 'YYYY-MM-DDTHH:mm:ss[Z]');
        if (myMoment.isBefore(curDateTime)) {
          newPlotlyData['x'][traceIdx].push(d['ts']);
          newPlotlyData['y'][traceIdx].push(d['value']);
        }
      } 
    }

    this.targetChart.ExtendTraces(newPlotlyData, [0,1,2]);
  }

  isReplaying(replaying: boolean) {
    this.Replaying = replaying;
  }

  ngOnDestroy(): void {
    this.alive = false; 
  }

}
