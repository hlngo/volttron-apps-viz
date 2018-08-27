import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ZoneDataService } from "app/services/zone-data.service";
import { Observable } from "rxjs/Rx";

import { PlotlyComponent } from "app/plotly/plotly.component";

@Component({
  selector: 'app-zone-comfort',
  templateUrl: './zone-comfort.component.html',
  styleUrls: ['./zone-comfort.component.css'],
  providers: [ ZoneDataService ] 
})
export class ZoneComfortComponent implements OnInit, OnDestroy {
  @Input() viewDate: string;
  @ViewChild('zoneChart') 
  private zoneChart: PlotlyComponent;

  public PlotlyLayout: any;
  public PlotlyData: object[];
  public PlotlyOptions: any;
  public DisplayData: boolean = false;
  public Replaying: boolean = false;
  public PlotlyId: string;

  private alive: boolean; // used to unsubscribe from the Observable timer
                          // when OnDestroy is called.

  private timer: Observable<number>;
  private interval: number;

  private site = 'PNNL'
  private building = '350_BUILDING'
  private equips = ['HP1B', 'HP7']
  private points = ['ZoneTemperature', 'CoolingTemperatureSetPoint']
  private pointLabels = {
    'ZoneTemperature': 'Zone Temperature',
    'CoolingTemperatureSetPoint': 'Cooling Temperature Set Point'
  }

  constructor(private _zoneDataService: ZoneDataService) { 
    this.alive = true;
    this.interval = 1000;
    this.timer = Observable.timer(this.interval, this.interval);
  }

  ngOnInit() {
    this.PlotlyId = 'zone_plot';
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
      yaxis: {
          title: 'Temperature (F)',
          range: [65, 80]
      },
      annotations: [
        {
          text: 'High Limit',
          xref: 'paper',
          x: 0.99,
          y: 78,
          yshift: 10,
          showarrow: false
        },
        {
          text: 'Low Limit',
          xref: 'paper',
          x: 0.99,
          y: 68,
          yshift: -10,
          showarrow: false
        }
      ],
      shapes: [
        //High limit
        {
          type: 'line',
          'xref': 'paper',
          'x0': 0,
          'y0': 78,
          'x1': 1,
          'y1': 78,
          'line': {
            color: 'red',
            width: 2
          }
        },
        //Low limit
        {
          type: 'line',
          'xref': 'paper',
          'x0': 0,
          'y0': 68,
          'x1': 1,
          'y1': 68,
          'line': {
            color: 'red',
            width: 2.5
          }
        }
      ]
    };

    this.PlotlyData = [];
    for (let equip of this.equips) {
      for (let point of this.points) {
        this.PlotlyData.push({
          name: `${equip} ${this.pointLabels[point]}`,
          x: [], 
          y: [],
          mode: 'lines'
        });
      }
    }
    
    //Initial get
    let idx: number = 0;
    for (let equip of this.equips) {
      for (let point of this.points) {
        let curIdx = idx; //create local scope variable to use with call-back
        idx++;
        this._zoneDataService.GetZoneData(this.site, this.building, equip, point, this.viewDate)
          .subscribe(
            data => {
              this.setNewData(data, this.site, this.building, equip, point, curIdx);
            },
            error => console.log(error.json().error),
            () => console.log(`Get ${this.site}/${this.building}/${equip}/${point} completed.`));
      }
    }  
  }//ngOnInit

  private setNewData(data, site, building, equip, point, traceIdx: number ): any {
    if (data == null || data['result']) return;

    //Refort data to Plotly format
    let newPlotlyData: any = {x: [[]], y: [[]]};

    //for (let d of data['result']) {
    for (let d of data) {
      newPlotlyData['x'][0].push(d['ts']);
      newPlotlyData['y'][0].push(d['value']);
    }

    this.zoneChart.ExtendTraces(newPlotlyData, [traceIdx]);
  }


  isReplaying(replaying: boolean) {
    this.Replaying = replaying;
  }

  ngOnDestroy(): void {
    this.alive = false; 
  }

}
