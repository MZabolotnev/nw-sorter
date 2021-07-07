import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileListComponent} from "./components/file-list/file-list.component";
import {EffectsModule} from "@ngrx/effects";
import {FileListEffects} from "./store/file-list.effects";
import {StoreModule} from "@ngrx/store";
import * as fromFileList from "./store/file-list.reducer";



@NgModule({
  declarations: [FileListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('fileList', fromFileList.reducer, {
      initialState: fromFileList.getInitialState,
      metaReducers: [],
    }),
    EffectsModule.forFeature([FileListEffects]),

  ],
  exports: [FileListComponent]
})
export class FileListModule { }
