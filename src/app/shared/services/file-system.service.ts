import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../constants/notifications';
import { of, from, defer, timer, Observable, throwError } from 'rxjs';

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

  searchFiles(path: string, rawString: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fs.readdir(path, (err: Error, files: any) => {
        if (err) return reject(err);
        const fileNames = files.map((file: string) => file);
        const rawFileNames = rawString
          .replace(/[^0-9]/g, ' ')
          .trim()
          .split(/ +/g)
          .filter((el) => el.length > 0);

        if (rawFileNames.length === 0) {
          reject(NOTIFICATIONS.ERROR.PARSE_STR.MESSAGE);
        }

        const targetFilenames = rawFileNames.reduce((acc: string[], curr) => {
          const target = fileNames.find((element: string) =>
            element.includes(curr)
          );
          if (target) {
            acc.push(target);
          }
          return acc;
        }, []);

        if (targetFilenames.length) {
          resolve(targetFilenames);
        }
        reject(NOTIFICATIONS.ERROR.NO_FILES.MESSAGE);
      });
    });
  }
}
