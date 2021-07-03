import * as controllerActions from './controller.actions';
import {
  createFeatureSelector,
  createReducer,
  on,
  Action,
  ActionReducer,
  createSelector,
} from '@ngrx/store';

export interface State {
  folderPath: string,
  filenames: string,
  selectAll: boolean,
  convertFolderName: string,
  sortFolderName: string,
  isSort: boolean,
  isConvert: boolean,
}

export function getInitialState(): State {
  return {
    folderPath: '',
    filenames: '',
    selectAll: false,
    convertFolderName: 'converted',
    sortFolderName: 'sorted',
    isSort: true,
    isConvert: false,
  }
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
  on(controllerActions.updateConvertFolderName, (state, { convertFolderName }) => ({
    ...state,
    convertFolderName,
  })),
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
);

export function reducer(state: State | undefined, action: Action) {
  return controllerReducer(state, action);
}


export const getState = createFeatureSelector<State>('controller');

