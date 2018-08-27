import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked, AfterContentInit } from '@angular/core';

// 1st way to import native js 
declare function require(moduleName: string): any;
var Plotly = require('./plotly.min.js');
// 2nd way to import typed js

@Component({
  selector: 'plotlychart',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit{
  @Input() plotId: string;
  @Input() data: any;
  @Input() layout: any;
  @Input() options: any;
  @Input() displayRawData: boolean;
  @Output() replaying: EventEmitter<boolean> = new EventEmitter<boolean>();

  private plotCreated: boolean = false;

  constructor() { } 
  setMyPlotId() : string {
    return this.plotId;
  }
  ngOnInit() {
    //this.options = {displayModeBar: false};
    //this.options = {displaylogo: false};
    this.options = {
      modeBarButtonsToRemove: [
      'sendDataToCloud', 'lasso2d', 'toggleSpikelines', 'setSpikelineVisibility'      
    ], displaylogo: false };
  }
 
  public ExtendTraces(newPlotlyData: any, traceArr: any) {
    if (!this.plotCreated) {
      this.plotCreated = true;
      Plotly.newPlot(this.plotId, this.data, this.layout, this.options);
    }
    Plotly.extendTraces(this.plotId, newPlotlyData, traceArr);
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
    let traceIndexes: number[] = new Array(traceArr.length);
    traceIndexes.fill(0);



    let replayInterval = setInterval(() => {
      let cont: boolean = false;
      for (let traceIdx in traceArr) {
        if (traceIndexes[traceIdx] < replayData[traceIdx]['x'].length) {
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
      //
      //Get next items from replayData
      //First, find next smallest X item
      let minX = null;
      for (let traceIdx in traceArr) {
        if (minX == null || minX > replayData[traceIdx]['x'][traceIndexes[traceIdx]]) {
          minX = replayData[traceIdx]['x'][traceIndexes[traceIdx]];
        }
      }
      //Then, push all items with X values = smallest X
      for (let traceIdx in traceArr) {
        if (traceIndexes[traceIdx] < replayData[traceIdx]['x'].length) {    //trace traceIdx still have items to plot
          if (replayData[traceIdx]['x'][traceIndexes[traceIdx]] == minX) {  //trace traceIdx item at traceIndexes[traceIdx] has X = minX
            nextData['x'][traceIdx].push(replayData[traceIdx]['x'][traceIndexes[traceIdx]]);
            nextData['y'][traceIdx].push(replayData[traceIdx]['y'][traceIndexes[traceIdx]]);
            traceIndexes[traceIdx] += 1;
          }
        }
      }

      Plotly.extendTraces(this.plotId, nextData, traceArr);
      //ExtendTraces(newPlotlyData, [0,1,2]);
      pointIdx++;
    }, 1);
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
