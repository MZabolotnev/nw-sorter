import { createAction, props } from '@ngrx/store';
import {IFile} from "../interfaces/file-list.interface";

export const updateFiles = createAction('[FileList] Update files list');

export const applyFileList = createAction('[FileList] Applying fileList');
export const updateFilesSuccess = createAction(
  '[FileList] Update files success',
  props<{ files: IFile[] }>()
);
export const updateFilesFail = createAction('[FileList] Update files fail ');
export const applyFileListSuccess = createAction(
  '[FileList] Applying fileList Success '
);
