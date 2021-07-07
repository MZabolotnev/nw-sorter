import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileListComponent} from "./components/file-list/file-list.component";



@NgModule({
  declarations: [FileListComponent],
  imports: [
    CommonModule
  ],
  exports: [FileListComponent]
})
export class FileListModule { }
