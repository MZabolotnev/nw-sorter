import { createAction, props } from '@ngrx/store';

export const updateFiles = createAction('[FileList] Update files list');
export const updatePreviews = createAction(
  '[FileList] Update folder path',
  props<{ previews: string[] }>()
);

export const applyFileList = createAction('[FileList] Applying fileList');
export const updateFilesSuccess = createAction(
  '[FileList] Update files success',
  props<{ files: string[] }>()
);
export const updateFilesFail = createAction('[FileList] Update files fail ');
export const applyFileListSuccess = createAction(
  '[FileList] Applying fileList Success '
);
