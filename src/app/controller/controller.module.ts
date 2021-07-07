import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControllerFolderComponent } from './components/controller-folder/controller-folder.component';
import { ControllerInputComponent } from './components/controller-input/controller-input.component';
import { ControllerCheckboxComponent } from './components/controller-checkbox/controller-checkbox.component';
import { SharedModule } from '../shared/shared.module';
import { ControllerTextareaComponent } from './components/controller-textarea/controller-textarea.component';
import {EffectsModule} from "@ngrx/effects";
import {ControllerEffects} from "./store/controller.effects";
import {StoreModule} from "@ngrx/store";
import * as fromController from './store/controller.reducer';


@NgModule({
  declarations: [
    ControllerFolderComponent,
    ControllerInputComponent,
    ControllerCheckboxComponent,
    ControllerTextareaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('controller', fromController.reducer, {
      initialState: fromController.getInitialState,
      metaReducers: [],
    }),
    EffectsModule.forFeature([ControllerEffects]),
  ],
  exports: [
    ControllerFolderComponent,
    ControllerInputComponent,
    ControllerCheckboxComponent,
    ControllerTextareaComponent,
  ],
})
export class ControllerModule {}
