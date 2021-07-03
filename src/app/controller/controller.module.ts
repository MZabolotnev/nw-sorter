import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControllerFolderComponent } from './components/controller-folder/controller-folder.component';
import { ControllerNameComponent } from './components/controller-name/controller-name.component';
import { ControllerCheckboxComponent } from './components/controller-checkbox/controller-checkbox.component';

@NgModule({
  declarations: [ControllerFolderComponent, ControllerNameComponent, ControllerCheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ControllerFolderComponent, ControllerNameComponent, ControllerCheckboxComponent],
})
export class ControllerModule {}
