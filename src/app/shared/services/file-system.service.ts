import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../constants/notifications';
import {of, from, defer, timer, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  fs: any;
  constructor(public notificationService: NotificationService) {
    this.fs = window.nw.require('fs');
  }

  isFolderEmpty(path: string): boolean {
    try {
      return this.fs.readdirSync(path).length === 0;
    } catch (error) {
      this.notificationService.error({
        title: NOTIFICATIONS.ERROR.READ_FOLDER.TITLE,
        message: error,
      });
    }
    return false;
  }

  resolveAfter5Seconds(): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['test']);
      }, 5000);
    });
  }

   findFiles$(path: string, rawString: string): Observable<string[]>  {
     return  this.fs.promise.readdir('dssdfs');

     // try {
    //   const fileNames = rawString.replace(/[^0-9]/g, ' ').trim().split(/ +/g);
    //
    //   // this.fs.readdir(path,  (err, items) => {
    //   //   for (let i=0; i<items.length; i++) {
    //   //     if (items[i].indexOf(name) !== -1) {
    //   //       console.log(items[i]);
    //   //     }
    //   //   }
    //   // });
    //
    //   // return  from(this.resolveAfter5Seconds());
    //   return  this.fs.promise.readdir('dssdfs');
    //
    // } catch (error) {
    //   this.notificationService.error({
    //     title: NOTIFICATIONS.ERROR.READ_FOLDER.TITLE,
    //     message: error,
    //   });
    // }
    // throw new Error();
  }
}
