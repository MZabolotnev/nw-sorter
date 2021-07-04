import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../constants/notifications';

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
}
