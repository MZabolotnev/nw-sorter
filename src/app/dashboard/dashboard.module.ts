import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {ControllerModule} from "../controller/controller.module";
import {FileListModule} from "../file-list/file-list.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ControllerModule,
    FileListModule,
    SharedModule
  ]
})
export class DashboardModule { }
