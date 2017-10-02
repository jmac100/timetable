import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

// services
import { AppService } from "./services/app.service";

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// 3rd party
import { Ng2PageScrollModule } from "ng2-page-scroll";
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2PageScrollModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path:'**', redirectTo: '/home', pathMatch: 'full' }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
