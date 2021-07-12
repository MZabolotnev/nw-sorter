import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as fromController from '../controller/store/controller.reducer';
import * as fromFileList from '../file-list/store/file-list.reducer';
import { ControllerService } from '../controller/store/controller.service';
import { FileListService } from '../file-list/store/file-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  controller$: Observable<fromController.State>;
  fileList$: Observable<fromFileList.State>;
  loading = false;
  constructor(
    private controllerService: ControllerService,
    private fileListService: FileListService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.controller$ = this.controllerService.controller$;
    this.fileList$ = this.fileListService.fileList$;
    this.fileList$.subscribe((fl) => {
      this.loading = fl.loading;
      this.changeDetection.detectChanges();
    });
  }

  updateFolderPath(folderPath: string) {
    this.controllerService.updateFolderPathAction(folderPath);
  }
  updateSelectAll(selectAll: boolean) {
    this.controllerService.updateSelectAllAction(selectAll);
  }
  updateFilenames(filenames: string) {
    this.controllerService.updateFilenamesAction(filenames);
  }

  updateConvertFolderName(convertFolderName: string) {
    this.controllerService.updateConvertFolderNameAction(convertFolderName);
  }

  updateSortFolderName(sortFolderName: string) {
    this.controllerService.updateSortFolderNameAction(sortFolderName);
  }

  updateIsSort(isSort: boolean) {
    this.controllerService.updateIsSortAction(isSort);
  }

  updateIsConvert(isConvert: boolean) {
    this.controllerService.updateIsConvertAction(isConvert);
  }

  applyProcess() {
    this.controllerService.applyProcessAction();
  }

  applyFiles() {
    this.controllerService.applyFiles();
  }

  isProcessDisabled(controller: fromController.State): boolean {
    return (
      !controller.filenames ||
      !controller.folderPath ||
      (!controller.isSort && !controller.isConvert)
    );
  }

  getApplyFilesButtonText(controller: fromController.State): string {
    const nothingSelectedText = '↑ select one of options';
    const sortText = 'Sort';
    const convertText = 'convert';
    const isBothOptions = controller.isSort && controller.isConvert;
    const isNothingSelected = !controller.isSort && !controller.isConvert;
    if (isNothingSelected) {
      return nothingSelectedText;
    }
    const isConvertText = isBothOptions
      ? convertText
      : convertText[0].toUpperCase() + convertText.substring(1);

    return `${controller.isSort ? sortText : ''}${
      isBothOptions ? ' and ' : ''
    }${controller.isConvert ? isConvertText : ''}`;
  }
}
