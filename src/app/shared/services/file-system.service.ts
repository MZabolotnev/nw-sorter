import { ChangeDetectorRef, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { NOTIFICATIONS } from '../constants/notifications';
import { of, from, defer, timer, Observable, throwError } from 'rxjs';
import { IFile } from '../../file-list/interfaces/file-list.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as buffer from 'buffer';
import {
  CONVERT_LOADING_TEXT,
  DEFAULT_APP_OPTIONS,
  PROCESS_LOADING_TEXT,
  SORT_LOADING_TEXT,
} from '../constants/constants';
import { State } from '../../controller/store/controller.reducer';
import { AddTimestampPipe } from '../pipes/add-timestamp.pipe';
import { FileListService } from '../../file-list/store/file-list.service';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  fs: any;
  fsPromises: any;
  dcraw: any;
  jimp: any;
  constructor(
    public notificationService: NotificationService,
    public addTimestampPipe: AddTimestampPipe,
    private sanitizer: DomSanitizer,
    private fileListService: FileListService
  ) {
    this.fs = window.nw.require('fs');
    this.fsPromises = this.fs.promises;
    this.dcraw = window.nw.require('dcraw');
    this.jimp = window.nw.require('jimp');
  }

  isFolderEmpty(path: string): boolean {
    console.log(path);
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

  async searchFiles(
    path: string,
    rawString: string,
    selectAll: boolean
  ): Promise<IFile[]> {
    this.fileListService.updateLoadingText(PROCESS_LOADING_TEXT);
    const files = await this.fsPromises.readdir(path);
    const fileNames = files.map((file: string) => file);
    if (selectAll) {
      return await this.addPreviews(path, fileNames);
    }

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
    for (const [index, value] of files.entries()) {
      this.fileListService.updateLoadingValue({
        current: index + 1,
        total: files.length + 1,
      });
      let preview;
      try {
        const buf = await this.fsPromises.readFile(`${folderPath}/${value}`);
        const img = await this.bufImgResize(
          buf,
          DEFAULT_APP_OPTIONS.DEFAULT_PREVIEW_SIZE_PX
        );
        preview = await this.bufToUrl(img);
      } catch (err) {
        this.notificationService.warning({
          title: `${NOTIFICATIONS.WARNING.PREVIEW.TITLE}${value}`,
          message: err,
        });
        preview = null;
      }

      output.push({
        name: value,
        preview,
      });
    }
    return output;
  }

  async bufImgResize(buf: ArrayBuffer, height: number): Promise<ArrayBuffer> {
    const blob = new Blob([this.dcraw(buf, { extractThumbnail: true })], {
      type: 'image/jpeg',
    });
    const arrBuff = await blob.arrayBuffer();
    const jimpImg = await this.jimp.read(arrBuff);
    const jimpResized = await jimpImg.resize(this.jimp.AUTO, height);
    return await jimpResized.getBufferAsync(this.jimp.MIME_JPEG);
  }

  async bufToUrl(buf: ArrayBuffer): Promise<SafeUrl> {
    const jimpImg = await this.jimp.read(buf);
    const base64 = await jimpImg.getBase64Async(this.jimp.MIME_PNG);
    return this.sanitizer.bypassSecurityTrustUrl(base64);
  }

  async processFiles(controller: State, files: IFile[]): Promise<boolean> {
    const {
      folderPath,
      convertFolderName,
      sortFolderName,
      isSort,
      isConvert,
    } = controller;

    if (isConvert) {
      this.fileListService.updateLoadingText(CONVERT_LOADING_TEXT);
      const convert = await this.fileWorker(
        folderPath,
        this.addTimestampPipe.transform(convertFolderName),
        files.filter((file) => file.preview),
        this.convertFile.bind(this)
      );
    }

    if (isSort) {
      this.fileListService.updateLoadingText(SORT_LOADING_TEXT);

      const sort = await this.fileWorker(
        folderPath,
        // this.addTimestampPipe.transform(sortFolderName),
        sortFolderName,
        files,
        this.copyFile.bind(this)
      );
    }
    return true;
  }

  async fileWorker(
    folderPath: string,
    folderName: string,
    files: IFile[],
    func: Function
  ): Promise<any> {
    const createDir = await this.createDir(folderPath, folderName);

    for (const [index, value] of files.entries()) {
      const worker = await func(folderPath, folderName, value);
      this.fileListService.updateLoadingValue({
        current: index + 1,
        total: files.length + 1,
      });
    }

    return true;
  }

  async createDir(path: string, name: string): Promise<any> {
    return this.fsPromises.mkdir(`${path}/${name}`);
  }

  async copyFile(
    path: string,
    sortFolderName: string,
    file: IFile
  ): Promise<any> {
    return this.fsPromises.copyFile(
      `${path}/${file.name}`,
      `${path}/${sortFolderName}/${file.name}`
    );
  }

  async convertFile(
    path: string,
    convertFolderName: string,
    file: IFile
  ): Promise<any> {
    const buf = await this.fsPromises.readFile(`${path}/${file.name}`);
    const jpgBuf = await this.bufImgResize(
      buf,
      DEFAULT_APP_OPTIONS.DEFAULT_CONVERT_SIZE_PX
    );
    return this.fsPromises.writeFile(
      `${path}/${convertFolderName}/${file.name.replace(/\.[^/.]+$/, '.jpeg')}`,
      jpgBuf
    );
  }
}
