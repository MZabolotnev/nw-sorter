import * as fileListActions from './file-list.actions';
import {
  createFeatureSelector,
  createReducer,
  on,
  Action,
  ActionReducer,
  createSelector,
} from '@ngrx/store';

export interface State {
  files: string[];
  previews: string[];
  loading: boolean;
}

export function getInitialState(): State {
  return {
    files: [],
    previews: [],
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
  on(fileListActions.updatePreviews, (state, { previews }) => ({
    ...state,
    previews,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return fileListReducer(state, action);
}

export const getState = createFeatureSelector<State>('fileList');
