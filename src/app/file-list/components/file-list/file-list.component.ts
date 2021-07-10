import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less'],
})
export class FileListComponent implements OnInit {
  @Input()
  set files(files: string[]) {
    this.currentFiles= files;
  }
  get files(): string[] {
    return this.currentFiles;
  }

  currentFiles: string[];

  constructor() {}

  ngOnInit(): void {}
}
