import { Component, OnInit } from '@angular/core';
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  schedule: any[];
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor(private appservice: AppService) { }

  ngOnInit() {
    this.getSchedule();
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

    return (day == this.days[n]) && (currentTimeInMinutes >= scheduleStartTimeInMinutes && currentTimeInMinutes < scheduleEndTimeInMinutes);
  }
}
