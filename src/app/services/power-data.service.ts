import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/timeout';

import { Configuration } from 'app/app.constants';
import { PowerData } from 'app/models/PowerData';


@Injectable()
export class PowerDataService {
  private actionUrl: string;
  private headers: Headers;
  private serviceName: string = 'PowerData';//'jsonrpc';
  private allBaselineEndPoint: string = '1';
  private allTargetEndPoint: string = '2';
  private allPowerEndPoint: string = '3';
  private allPowerEndPointAug: string = '10';
  private allPowerWithoutILCEndPoint: string = '4';
  private allPowerWithILCEndPoint: string = '5';
  private token: string;
  
  constructor(private _http: Http, private _configuration: Configuration) { 
    this.actionUrl = `${_configuration.GetServer()}${this.serviceName}`;
    
    this.headers = new Headers();
    this.headers.append('Content-Type', 'text/plain');
    //CORS
    //https://stackoverflow.com/questions/36353532/angular2-options-method-sent-when-asking-for-http-get
    //this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public GetAllBaselineVC = (secureToken: string): Observable<Response> => {
    let postBody = {
      jsonrpc: '2.0',
      method: 'platform.historian.query',
      authorization: secureToken,
      params: {
        topic: 'target_agent/PNNL/350_BUILDING/goal/value',
        start: '2017-07-28 07:00:00',
        end: '2017-07-29 07:00:00',
        count: 1000,
        order: 'LAST_TO_FIRST'
      },
      id: '99352-4'
    }

    //let postBodyJson: string = JSON.stringify(postBody);
    return this._http.post(
      this.actionUrl, 
      postBody, {
        headers: this.headers
    }).map(res => res.json());
  }

  public GetAllBaseline = (viewDate): Observable<Response> => {
    console.log('Get GetAllBaseline starting...');
    return this._http.get(`${this.actionUrl}/${this.allBaselineEndPoint}?date=${viewDate}`, { 
      headers: this.headers 
    }).timeout(30000).map(res => res.json()).catch(this.handleErrorObservable);
  }

  public GetAllTarget = (viewDate): Observable<Response> => {
    console.log('Get GetAllTarget starting...');
    return this._http.get(`${this.actionUrl}/${this.allTargetEndPoint}?date=${viewDate}`, { 
      //headers: this.headers 
    }).timeout(30000).map(res => res.json()).catch(this.handleErrorObservable);
  }

  public GetAllPower = (viewDate, func): Observable<Response> => {
    console.log('Get GetAllPower starting...');
    return this._http.get(`${this.actionUrl}/${this.allPowerEndPoint}?date=${viewDate}&func=${func}`, { 
      //headers: this.headers 
    }).timeout(30000).map(res => res.json()).catch(this.handleErrorObservable);
  }

  public GetAllPowerAug = (viewDate, func): Observable<Response> => {
    console.log('Get GetAllPower starting...');
    return this._http.get(`${this.actionUrl}/${this.allPowerEndPointAug}?date=${viewDate}&func=${func}`, { 
      //headers: this.headers 
    }).timeout(30000).map(res => res.json()).catch(this.handleErrorObservable);
  }

  public GetAllPowerWithILC = (viewDate, func, season): Observable<Response> => {
    console.log('Get GetAllPowerWithILC starting...');
    return this._http.get(`${this.actionUrl}/${this.allPowerWithILCEndPoint}?season=${season}`, { 
      //headers: this.headers 
    }).timeout(3000000).map(res => res.json()).catch(this.handleErrorObservable);
  }

  public GetAllPowerWithoutILC = (viewDate, func, season): Observable<Response> => {
    console.log('Get GetAllPowerWithoutILC starting...');
    return this._http.get(`${this.actionUrl}/${this.allPowerWithoutILCEndPoint}?season=${season}`, { 
      //headers: this.headers 
    }).timeout(3000000).map(res => res.json()).catch(this.handleErrorObservable);
  }


  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
 
}               
