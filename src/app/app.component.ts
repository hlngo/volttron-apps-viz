import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from "app/services/authentication.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthenticationService ] 
})
export class AppComponent {
  title1 = 'PNNL Building 350 - Peak Load Management';
  title2 = 'Intelligent Load Control'
  
}
