import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any): any {
    var h = parseInt(value.split(':')[0]);
    h = h > 12 ? h - 12 : h;
    return h + ':' + value.split(':')[1];
  }

}
