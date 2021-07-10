import * as fileListActions from './file-list.actions';
import {
  createFeatureSelector,
  createReducer,
  on,
  Action,
  ActionReducer,
  createSelector,
} from '@ngrx/store';
import {IFile} from "../interfaces/file-list.interface";

export interface State {
  files: IFile[];
  loading: boolean;
}

export function getInitialState(): State {
  return {
    files: [],
    loading: false,
  };
}

export const fileListReducer = createReducer(
  getInitialState(),
  on(fileListActions.updateFiles, (state) => ({
    ...state,
    loading: true,
  })),
  on(fileListActions.updateFilesSuccess, (state, { files }) => ({
    ...state,
    loading: false,
    files,
  })),
  on(fileListActions.updateFilesFail, (state) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return fileListReducer(state, action);
}

export const getState = createFeatureSelector<State>('fileList');
