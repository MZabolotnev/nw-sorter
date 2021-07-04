import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';

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
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.error({
      title: 'Test',
      message: 'Notification',
    });
  }

  changeFolder(event: Event | null) {
    const target = event?.target as any;

    this.update.emit(target.value);
  }
}
