import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromController from '../controller/store/controller.reducer';
import { ControllerService } from '../controller/store/controller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  controller$: Observable<fromController.State>;

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    this.controller$ = this.controllerService.controller$;
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

  applyController() {
    this.controllerService.applyControllerAction();
  }

  isProcessDisabled(controller: fromController.State):boolean {
    return (
      !controller.filenames ||
      !controller.folderPath ||
      (!controller.isSort || !controller.isConvert)
    );
  }
}
