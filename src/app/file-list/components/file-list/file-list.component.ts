import { Component, Input, OnInit } from '@angular/core';
import { IFile } from '../../interfaces/file-list.interface';
import { FileListService } from '../../store/file-list.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less'],
})
export class FileListComponent implements OnInit {
  @Input()
  set files(files: IFile[]) {
    this.currentFiles = files;
  }
  get files(): IFile[] {
    return this.currentFiles;
  }

  @Input()
  set confirmedFiles(files: IFile[]) {
    this.currentConfirmedFiles = files;
  }
  get confirmedFiles(): IFile[] {
    return this.currentConfirmedFiles;
  }

  currentFiles: IFile[];
  currentConfirmedFiles: IFile[];

  constructor(private fileListService: FileListService) {}

  ngOnInit(): void {}

  updateConfirmedFiles({ name, checked }: { name: string; checked: boolean }) {
    const files = [...this.confirmedFiles];
    if (checked) {
      const index = this.files.findIndex((el) => el.name === name);
      files.splice(index, 0, this.files[index]);
    } else {
      const index = this.confirmedFiles.findIndex((el) => el.name === name);
      files.splice(index, 1);
    }
    this.fileListService.updateConfirmedFiles(files);
  }

  getChecked(file: IFile): boolean {
    return !!this.confirmedFiles.find((el) => el.name === file.name);
  }
}
