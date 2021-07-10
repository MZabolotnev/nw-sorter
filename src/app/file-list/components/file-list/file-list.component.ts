import { Component, Input, OnInit } from '@angular/core';
import {IFile} from "../../interfaces/file-list.interface";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less'],
})
export class FileListComponent implements OnInit {
  @Input()
  set files(files: IFile[]) {
    this.currentFiles= files;
  }
  get files(): IFile[] {
    return this.currentFiles;
  }

  currentFiles: IFile[];

  constructor() {}

  ngOnInit(): void {}
}
