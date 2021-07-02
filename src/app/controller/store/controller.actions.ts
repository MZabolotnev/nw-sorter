import { createAction, props } from '@ngrx/store';

export const updateFolderPath = createAction('[Controller] Update folder path', props<{ folderPath: string }>());
export const updateFilenames = createAction('[Controller] Update filenames', props<{ filenames: [] }>());
export const updateSelectAll = createAction('[Controller] Update select all checkbox', props<{ selectAll: boolean }>());
export const updateConvertFolderName = createAction('[Controller] Update convert folder name', props<{ convertFolderName: string }>());
export const updateSortFolderName = createAction('[Controller] Update sort folder name', props<{ sortFolderName: string }>());
export const updateIsSort = createAction('[Controller] Update is sort option', props<{ isSort: boolean }>());
export const updateIsConvert = createAction('[Controller] Update is convert option', props<{ isConvert: boolean }>());
export const applyController = createAction('[Controller] Applying controller');
export const applyControllerSuccess = createAction('[Controller] Applying controller Success ');
