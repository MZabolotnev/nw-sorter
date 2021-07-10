import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fileListActions from './file-list.actions';
import { Observable, combineLatest } from 'rxjs';
import * as fromFileList from './file-list.reducer';
import { StoreModel } from '../../app.store';

@Injectable({
  providedIn: 'root',
})
export class FileListService {
  constructor(private store: Store<StoreModel>) {}

  get fileList$(): Observable<fromFileList.State> {
    return this.store.select(fromFileList.getState);
  }

  updateFiles(files: string[]) {
    this.store.dispatch(fileListActions.updateFiles());
  }
  updatePreviews(previews: string[]) {
    this.store.dispatch(fileListActions.updatePreviews({ previews }));
  }

  applyFileList() {
    this.store.dispatch(fileListActions.applyFileList());
  }
}
