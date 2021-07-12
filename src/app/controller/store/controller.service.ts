import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as controllerActions from './controller.actions';
import { Observable, combineLatest } from 'rxjs';
import * as fromController from './controller.reducer';
import {StoreModel} from "../../app.store";



@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  constructor(private store: Store<StoreModel>) {}

  get controller$(): Observable<fromController.State> {
    return this.store.select(fromController.getState);
  }


  updateFolderPathAction(folderPath: string) {
    this.store.dispatch(controllerActions.updateFolderPath({ folderPath }));
  }
  updateFilenamesAction(filenames: string) {
    this.store.dispatch(controllerActions.updateFilenames({ filenames }));
  }
  updateSelectAllAction(selectAll: boolean) {
    this.store.dispatch(controllerActions.updateSelectAll({ selectAll }));
  }
  updateConvertFolderNameAction(convertFolderName: string) {
    this.store.dispatch(controllerActions.updateConvertFolderName({ convertFolderName }));
  }
  updateSortFolderNameAction(sortFolderName: string) {
    this.store.dispatch(controllerActions.updateSortFolderName({ sortFolderName }));
  }
  updateIsSortAction(isSort: boolean) {
    this.store.dispatch(controllerActions.updateIsSort({ isSort }));
  }
  updateIsConvertAction(isConvert: boolean) {
    this.store.dispatch(controllerActions.updateIsConvert({ isConvert }));
  }
  applyProcessAction() {
    this.store.dispatch(controllerActions.applyProcess());
  }
  applyFiles() {
    this.store.dispatch(controllerActions.applyFiles());
  }

}
