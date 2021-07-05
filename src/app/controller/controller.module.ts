import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControllerFolderComponent } from './components/controller-folder/controller-folder.component';
import { ControllerInputComponent } from './components/controller-input/controller-input.component';
import { ControllerCheckboxComponent } from './components/controller-checkbox/controller-checkbox.component';
import {SharedModule} from "../shared/shared.module";
import {ControllerTextareaComponent} from "./components/controller-textarea/controller-textarea.component";

@NgModule({
  declarations: [ControllerFolderComponent, ControllerInputComponent, ControllerCheckboxComponent, ControllerTextareaComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [ControllerFolderComponent, ControllerInputComponent, ControllerCheckboxComponent, ControllerTextareaComponent],
})
export class ControllerModule {}
