import * as controllerActions from './controller.actions';
import { createFeatureSelector, createReducer, on, Action } from '@ngrx/store';
import { DEFAULT_APP_OPTIONS } from '../../shared/constants/constants';

export interface State {
  folderPath: string;
  filenames: string;
  selectAll: boolean;
  convertFolderName: string;
  sortFolderName: string;
  isSort: boolean;
  isConvert: boolean;
}

export function getInitialState(): State {
  return {
    folderPath: '',
    filenames: '',
    selectAll: false,
    convertFolderName: DEFAULT_APP_OPTIONS.DEFAULT_CONVERT_FOLDER_PREFIX,
    sortFolderName: DEFAULT_APP_OPTIONS.DEFAULT_SORT_FOLDER_PREFIX,
    isSort: true,
    isConvert: false,
  };
}

export const controllerReducer = createReducer(
  getInitialState(),
  on(controllerActions.updateFolderPath, (state, { folderPath }) => ({
    ...state,
    folderPath,
  })),
  on(controllerActions.updateFilenames, (state, { filenames }) => ({
    ...state,
    filenames,
  })),
  on(controllerActions.updateSelectAll, (state, { selectAll }) => ({
    ...state,
    selectAll,
  })),
  on(
    controllerActions.updateConvertFolderName,
    (state, { convertFolderName }) => ({
      ...state,
      convertFolderName,
    })
  ),
  on(controllerActions.updateSortFolderName, (state, { sortFolderName }) => ({
    ...state,
    sortFolderName,
  })),
  on(controllerActions.updateIsSort, (state, { isSort }) => ({
    ...state,
    isSort,
  })),
  on(controllerActions.updateIsConvert, (state, { isConvert }) => ({
    ...state,
    isConvert,
  })),
  on(controllerActions.applyProcess, (state) => ({
    ...state,
  })),
  on(controllerActions.applyFiles, (state) => ({
    ...state,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return controllerReducer(state, action);
}

export const getState = createFeatureSelector<State>('controller');
