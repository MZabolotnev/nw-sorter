import * as fromController from './controller/store/controller.reducer';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';


export interface StoreModel {
  controller: fromController.State;
}

export const reducers: ActionReducerMap<StoreModel> = {
  controller: fromController.reducer,
};

export function logger(reducer: ActionReducer<StoreModel>): ActionReducer<StoreModel> {
  return storeLogger({ collapsed: true })(reducer);
}

export const metaReducers: MetaReducer<StoreModel>[] = [logger];
