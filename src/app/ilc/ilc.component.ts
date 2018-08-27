import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from "app/services/authentication.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-ilc',
  templateUrl: './ilc.component.html',
  styleUrls: ['./ilc.component.css'],
  providers: [ AuthenticationService ] 
})
export class IlcComponent implements OnInit, OnDestroy {

  public SecureToken: string;
  public ViewDate: string;
  public Func: string;
  private sub: Subscription;


  constructor(private _authService: AuthenticationService, 
    private _route: ActivatedRoute, 
    private _router: Router) { 

  }

  ngOnInit() {
    this.sub = this._route
      .queryParams
      //.skip(1) //See setTimeout() below
      .subscribe((params: Params) => {
        // Defaults to 0 if no query param provided.
        this.ViewDate = params['date'] || '0';
        this.Func = params['func'] || '0';
        console.log(`Date1 is: ${this.ViewDate}`);
      });
    
    //This is because the Observable is behavior object
    //  1st subscribe always returns undefined -> thus, skip(1) above
    //Give 300ms for all params are assigned (e.g., ViewDate) before checking ViewDate
    //Seems like this happens only if the component is embedded at the app level
    // setTimeout(() => {
    //   if (!this.ViewDate) {
    //     this.ViewDate = '0';  
    //   }
    //   if (!this.Func) {
    //     this.Func = '0';  
    //   }
    // }, 300);


    //Get Secure Token
    // this._authService.GetSecureToken()
    //   .subscribe(
    //     data => this.setSecureToken(data),
    //     error => console.log("ERROR__:" + error),
    //     () => console.log('Get Auth completed'));
  }

  private setSecureToken(data: any) {
    this.SecureToken = data['result'];
    console.log(this.SecureToken);
  }

  ngOnDestroy(): void {
    console.log(this.sub);
    this.sub.unsubscribe();
  }

}
