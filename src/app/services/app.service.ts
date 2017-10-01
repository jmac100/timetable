import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getSchedule() {
    return this.http.get('https://staging-games.firebaseio.com/schedule/.json')
      .map(res => res.json());
  }

}
