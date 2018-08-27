import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Configuration } from 'app/app.constants';

@Injectable()
export class ZoneDataService {

  private actionUrl: string;
  private headers: Headers;
  private serviceName: string = 'ZoneData';//'jsonrpc';
  
  constructor(private _http: Http, private _configuration: Configuration) { 
    this.actionUrl = `${_configuration.GetServer()}${this.serviceName}`;

    this.headers = new Headers();
    this.headers.append('Content-Type', 'text/plain');
    //CORS
    //https://stackoverflow.com/questions/36353532/angular2-options-method-sent-when-asking-for-http-get
    //this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public GetZoneData = (site, building, equip, point, viewDate): Observable<Response> => {
    //let params = new URLSearchParams();
    //params.set('topic', `${site},${building},${equip},${point}`);
    //params.set('topic', 'PNNL,350_BUILDING,HP1B,ZoneTemperature');
    console.log('Get GetZoneData starting...');
    return this._http.get(`${this.actionUrl}?topic=${site},${building},${equip},${point}&date=${viewDate}`, { 
      headers: this.headers
    }).timeout(30000).map(res => res.json()).catch(this.handleErrorObservable);
  }


  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
