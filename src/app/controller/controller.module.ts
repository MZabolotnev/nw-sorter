import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControllerComponent} from "./controller.component";



@NgModule({
  declarations: [ControllerComponent],
  imports: [
    CommonModule
  ],
  exports: [ControllerComponent],

})
export class ControllerModule { }
