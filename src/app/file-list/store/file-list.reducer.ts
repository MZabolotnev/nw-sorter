import * as fileListActions from './file-list.actions';
import {
  createFeatureSelector,
  createReducer,
  on,
  Action,
  ActionReducer,
  createSelector,
} from '@ngrx/store';
import { IFile } from '../interfaces/file-list.interface';

export interface State {
  files: IFile[];
  confirmedFiles: IFile[];
  loading: boolean;
}

export function getInitialState(): State {
  return {
    files: [],
    confirmedFiles: [],
    loading: false,
  };
}

export const fileListReducer = createReducer(
  getInitialState(),
  on(fileListActions.updateFiles, (state) => ({
    ...state,
    loading: true,
  })),
  on(fileListActions.updateConfirmedFiles, (state, { confirmedFiles }) => ({
    ...state,
    confirmedFiles,
  })),
  on(fileListActions.updateFilesSuccess, (state, { files }) => ({
    ...state,
    files,
    confirmedFiles: [...files],
    loading: false,
  })),
  on(fileListActions.updateFilesFail, (state) => ({
    ...state,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileListReducer(state, action);
}

export const getState = createFeatureSelector<State>('fileList');
