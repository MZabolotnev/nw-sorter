import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTimestamp',
})
export class AddTimestampPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date();
    return `${value} ${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`;
  }
}
