import { Component, Input, Output, EventEmitter } from '@angular/core';

// 1st way to import native js 
declare function require(moduleName: string): any;
var Plotly = require('./plotly.min.js');
// 2nd way to import typed js

@Component({
  selector: 'plotlychart',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent{
  
  @Input() data: any;
  @Input() layout: any;
  @Input() options: any;
  @Input() displayRawData: boolean;
  @Output() replaying: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { } 
   
  ngOnInit() {
    console.log("ngOnInit Plotly Component");
    console.log(this.data);
    console.log(this.layout);

    Plotly.newPlot('myPlotlyDiv', this.data, this.layout, this.options);
  }
 
  public ExtendTraces(newPlotlyData: any, traceArr: any) {
      Plotly.extendTraces('myPlotlyDiv', newPlotlyData, traceArr);
  }

  onReplay() {
    this.replaying.next(true);
    let replayData = this.duplicateArray(this.data);

    //Clear data
    this.data.forEach(element => {
      element['x']= [];
      element['y']=[];
    });

    //Get traces
    let traceArr = Array.from(Array(this.data.length).keys());
    let pointIdx: number = 0;

    //Timer to plotting new points on replay
    let replayInterval = setInterval(() => {
      let cont: boolean = false;
      for (let traceIdx in traceArr) {
        if (pointIdx < replayData[traceIdx]['x'].length) {
          cont = true;
          break;
        }
      }
      if (!cont) {
        clearInterval(replayInterval);
        this.replaying.next(false);
        return;
      }
      let nextData = {x: [], y: []};
      for (let i in traceArr) {
        nextData['x'].push([]);
        nextData['y'].push([]);
      }
      //Get next items from replayData
      for (let traceIdx in traceArr) {
        if (pointIdx < replayData[traceIdx]['x'].length) {
          nextData['x'][traceIdx].push(replayData[traceIdx]['x'][pointIdx]);
          nextData['y'][traceIdx].push(replayData[traceIdx]['y'][pointIdx]);
        }
      }
      Plotly.extendTraces('myPlotlyDiv', nextData, traceArr);
      //ExtendTraces(newPlotlyData, [0,1,2]);
      pointIdx++;
    }, 200);
  }

  //Deep cloning an array
  public duplicateArray(sourceArr: any) {
    let arr = [];
    sourceArr.forEach((x) => {
      arr.push(Object.assign({}, x));
    })
    return arr;
  }
}
