import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fileListActions from './file-list.actions';
import { Observable, combineLatest } from 'rxjs';
import * as fromFileList from './file-list.reducer';
import { StoreModel } from '../../app.store';
import { IFile } from '../interfaces/file-list.interface';
import { ILoadingValue } from '../../shared/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class FileListService {
  constructor(private store: Store<StoreModel>) {}

  get fileList$(): Observable<fromFileList.State> {
    return this.store.select(fromFileList.getState);
  }

  updateConfirmedFiles(confirmedFiles: IFile[]) {
    this.store.dispatch(
      fileListActions.updateConfirmedFiles({ confirmedFiles })
    );
  }

  applyFiles() {
    this.store.dispatch(fileListActions.applyFiles());
  }

  updateLoadingValue(loadingValue: ILoadingValue) {
    this.store.dispatch(fileListActions.updateLoadingValue({ loadingValue }));
  }
  updateLoadingText(loadingText: string) {
    this.store.dispatch(fileListActions.updateLoadingText({ loadingText }));
  }
}
