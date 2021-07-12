import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../constants/notifications';
import { of, from, defer, timer, Observable, throwError } from 'rxjs';
import { IFile } from '../../file-list/interfaces/file-list.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as buffer from 'buffer';
import {DEFAULT_APP_OPTIONS} from "../constants/constants";

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  fs: any;
  fsPromises: any;
  dcraw: any;
  sharp: any;
  constructor(
    public notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {
    this.fs = window.nw.require('fs');
    this.fsPromises = this.fs.promises;
    this.dcraw = window.nw.require('dcraw');
    this.sharp = window.nw.require('sharp');
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

  async searchFiles(path: string, rawString: string): Promise<IFile[]> {
    const files = await this.fsPromises.readdir(path);
    const fileNames = files.map((file: string) => file);
    const rawFileNames = rawString
      .replace(/[^0-9]/g, ' ')
      .trim()
      .split(/ +/g)
      .filter((el) => el.length > 0);
    if (rawFileNames.length === 0) {
      throw Error(NOTIFICATIONS.ERROR.PARSE_STR.MESSAGE);
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
      return await this.addPreviews(path, targetFilenames);
    }
    throw Error(NOTIFICATIONS.ERROR.NO_FILES.MESSAGE);
  }

  async addPreviews(folderPath: string, files: string[]): Promise<IFile[]> {
    const output: IFile[] = [];
    for (const file of files) {
      const buf = await this.fsPromises.readFile(`${folderPath}/${file}`);
      const sharpImg = await this.bufImgResize(buf, DEFAULT_APP_OPTIONS.DEFAULT_PREVIEW_SIZE_PX);
      const preview = await this.bufToUrl(sharpImg);

      output.push({
        name: file,
        preview,
      });
    }
    return output;
  }

  async bufImgResize(buf: ArrayBuffer, height: number): Promise<ArrayBuffer> {
    const tiffFile = this.dcraw(buf, { extractThumbnail: true });
    return await this.sharp(tiffFile)
      .resize(height)
      .jpeg({ mozjpeg: true })
      .toBuffer();
  }

  async bufToUrl(buf: ArrayBuffer): Promise<SafeUrl> {
    const sharpImg = await this.sharp(buf).jpeg({ mozjpeg: true }).toBuffer();
    const stringChar = sharpImg.reduce((data: any, byte: any) => {
      return data + String.fromCharCode(byte);
    }, '');
    const base64String = btoa(stringChar);
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpg;base64, ` + base64String
    );
  }

  async processFiles(): Promise<boolean> {
    return true
  }


}
