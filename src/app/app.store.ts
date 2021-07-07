import * as fromController from './controller/store/controller.reducer';
import * as fromFileList from './file-list/store/file-list.reducer';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';


export interface StoreModel {
  controller: fromController.State;
  fileList: fromFileList.State;
}

export const reducers: ActionReducerMap<StoreModel> = {
  controller: fromController.reducer,
  fileList: fromFileList.reducer,
};

export function logger(reducer: ActionReducer<StoreModel>): ActionReducer<StoreModel> {
  return storeLogger({ collapsed: true })(reducer);
}

export const metaReducers: MetaReducer<StoreModel>[] = [logger];
