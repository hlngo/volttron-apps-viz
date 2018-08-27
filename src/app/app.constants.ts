import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    //public Server: string = "http://localhost:5000/";
    //public Server: string = "https://highroad.pnl.gov/";
    //public Server: string = "http://ddc.pnl.gov:5000/";
    //public Server: string = "http://172.18.69.117:8080/";

    public GetServer(): string {
        let server: string = 'http://localhost:5000/api/';
        if (window.location.hostname.includes('ddc')) {
            server = 'http://ddc.pnl.gov:5000/api/';
        }
        if (window.location.hostname.includes('highroad')) {
            server = 'http://highroad.pnl.gov:8080/api/';
        }
        return server;
    }
}