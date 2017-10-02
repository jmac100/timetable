import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { AppService } from "../services/app.service";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {

  schedule: any[];
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  activeClassAdded: boolean = false;

  constructor
    (
      private appservice: AppService, 
      private pageScrollService: PageScrollService, 
      @Inject(DOCUMENT) private document: any
    ) { }

  ngOnInit() {
    this.getSchedule();
  }

  ngAfterViewInit() {
    var self = this;
    setTimeout(function() {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '.active');
      self.pageScrollService.start(pageScrollInstance);
    }, 1000);
  }

  getSchedule() {
    this.appservice.getSchedule()
      .subscribe(schedule => {
        this.schedule = schedule;
      });
  }

  isActive(day, period) {
    var d = new Date();
    var n = d.getDay() - 1;
    var h = d.getHours();
    var m = d.getMinutes();
    
    var scheduleStartTime = period.start_time.split(':');
    var scheduleEndTime = period.end_time.split(':');

    var scheduleStartTimeInMinutes = parseInt(scheduleStartTime[0]) * 60 + parseInt(scheduleStartTime[1]);
    var scheduleEndTimeInMinutes = parseInt(scheduleEndTime[0]) * 60 + parseInt(scheduleEndTime[1]);
    var currentTimeInMinutes = h * 60 + m;

    this.activeClassAdded = (day == this.days[n]) && (currentTimeInMinutes >= scheduleStartTimeInMinutes && currentTimeInMinutes < scheduleEndTimeInMinutes);

    return this.activeClassAdded;
  }

  isOffset(period) {
    return period.period === 'recess' || period.period === 'snack' || period.period === 'lunch';
  }
}
