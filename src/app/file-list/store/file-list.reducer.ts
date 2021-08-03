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
import { ILoadingValue } from '../../shared/interfaces/interface';

export interface State {
  files: IFile[];
  confirmedFiles: IFile[];
  loading: boolean;
  loadingValue: ILoadingValue;
  loadingText: string;
}

export function getInitialState(): State {
  return {
    files: [],
    confirmedFiles: [],
    loading: false,
    loadingValue: null,
    loadingText: '',
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
    loadingValue: null,
    loadingText: '',
  })),
  on(fileListActions.updateLoadingValue, (state, { loadingValue }) => ({
    ...state,
    loadingValue,
  })),
  on(fileListActions.updateLoadingText, (state, { loadingText }) => ({
    ...state,
    loadingText,
  })),
  on(fileListActions.updateFilesFail, (state) => ({
    ...state,
    loading: false,
    loadingValue: null,
    loadingText: '',
  })),
  on(fileListActions.applyFiles, (state) => ({
    ...state,
    loading: true,
  })),
  on(fileListActions.applyFilesSuccess, (state) => ({
    ...state,
    loading: false,
    loadingValue: null,
    loadingText: '',
  })),
  on(fileListActions.applyFilesFail, (state) => ({
    ...state,
    loading: false,
    loadingValue: null,
    loadingText: '',
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileListReducer(state, action);
}

export const getState = createFeatureSelector<State>('fileList');
