import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Configuration } from 'app/app.constants';
import { PowerData } from 'app/models/PowerData';


@Injectable()
export class PowerDataService {
  private actionUrl: string;
  private headers: Headers;
  private serviceName: string = 'SnakeData';
  private allPowerEndPoint: string = 'AllPowerData/building1';
  private newPowerEndPoint: string = 'PowerData/building1';

  constructor(private _http: Http, private _configuration: Configuration) { 
    this.actionUrl = `${_configuration.Server}api/${this.serviceName}`;

    this.headers = new Headers();
    this.headers.append('Conent-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public GetAllPowerData = (): Observable<PowerData> => {
    return this._http.get(`${this.actionUrl}/${this.allPowerEndPoint}`, { 
      headers: this.headers 
    }).map(res => res.json());
  }

  public GetPowerData = (): Observable<PowerData> => {
    return this._http.get(`${this.actionUrl}/${this.newPowerEndPoint}`, { 
      headers: this.headers 
    }).map(res => res.json());
  }

}
