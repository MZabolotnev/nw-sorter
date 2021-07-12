import { createAction, props } from '@ngrx/store';
import {IFile} from "../interfaces/file-list.interface";

export const updateFiles = createAction('[FileList] Update files list');

export const applyFiles = createAction('[FileList] Applying fileList');
export const updateFilesSuccess = createAction(
  '[FileList] Update files success',
  props<{ files: IFile[] }>()
);
export const updateConfirmedFiles = createAction(
  '[FileList] Update confirmed files',
  props<{ confirmedFiles: IFile[] }>()
);
export const updateFilesFail = createAction('[FileList] Update files fail ');
export const applyFilesSuccess = createAction(
  '[FileList] Applying fileList Success '
);

export const applyFilesFail = createAction(
  '[FileList] Applying fileList Fail '
);
