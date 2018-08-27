import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Configuration } from 'app/app.constants';

@Injectable()
export class AuthenticationService {
  

  private actionUrl: string;
  private headers: Headers;
  private serviceName: string = 'jsonrpc';

  constructor(private _http: Http, private _configuration: Configuration) { 
    this.actionUrl = `${_configuration.GetServer()}${this.serviceName}`;

    this.headers = new Headers();
    this.headers.append('Conent-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public GetSecureToken = (): Observable<Response> => {
    let username: string = "reader";
    let password: string = "reader";
    
    // let token = this._http.get(`${this.actionUrl}/${this.newPowerEndPoint}`, { 
    //   headers: this.headers 
    // }).map(res => res.json());

    let postBody = {
      jsonrpc: '2.0',
        method: 'get_authorization',
        params: {
          username: username,
          password: password
        },
        id: '99352-4'
    }
    let postBodyJson: string = JSON.stringify(postBody);
    return this._http.post(
      this.actionUrl, 
      postBody, {
        headers: this.headers
    }).map(res => res.json()).catch(this.handleErrorObservable);
  }
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


}
