import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from 'app/app.component';
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { DemoComponent } from "app/demo/demo.component";
import { IlcComponent } from "app/ilc/ilc.component";

const appRoutes: Routes = [
  { path: 'ilc', component: IlcComponent },
  { path: 'demo', component: DemoComponent },
  { path: '',   redirectTo: '/ilc', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes //, { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}