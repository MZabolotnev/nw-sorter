import { createAction, props } from '@ngrx/store';
import { IFile } from '../interfaces/file-list.interface';
import { ILoadingValue } from '../../shared/interfaces/interface';

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
export const updateLoadingValue = createAction(
  '[FileList] Update loading value',
  props<{ loadingValue: ILoadingValue }>()
);
export const updateLoadingText = createAction(
  '[FileList] Update loading text',
  props<{ loadingText: string }>()
);
export const updateFilesFail = createAction('[FileList] Update files fail ');
export const applyFilesSuccess = createAction(
  '[FileList] Applying fileList Success '
);

export const applyFilesFail = createAction(
  '[FileList] Applying fileList Fail '
);
