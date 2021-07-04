import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { FileSystemService } from '../../../shared/services/file-system.service';
import { NOTIFICATIONS } from '../../../shared/constants/notifications';

@Component({
  selector: 'app-controller-folder',
  templateUrl: './controller-folder.component.html',
  styleUrls: ['./controller-folder.component.less'],
})
export class ControllerFolderComponent implements OnInit {
  @Input()
  set folderPath(folder: string) {
    this.currentFolderPath = folder;
  }
  get folderPath(): string {
    return this.currentFolderPath;
  }

  @Output() update: EventEmitter<string> = new EventEmitter();

  currentFolderPath: string;
  constructor(
    public notificationService: NotificationService,
    public fileSystemService: FileSystemService
  ) {}

  ngOnInit(): void {}

  changeFolder(event: Event | null) {
    const target = event?.target as any;
    const isEmpty = this.fileSystemService.isFolderEmpty(target.value);
    if (isEmpty) {
      this.notificationService.error({
        title: NOTIFICATIONS.ERROR.EMPTY_FOLDER.TITLE,
        message: NOTIFICATIONS.ERROR.EMPTY_FOLDER.MESSAGE,
      });
    } else {
      this.update.emit(target.value);
    }
  }
}
