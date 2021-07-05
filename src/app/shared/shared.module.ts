import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTimestampPipe } from './pipes/add-timestamp.pipe';

@NgModule({
  declarations: [AddTimestampPipe],
  imports: [CommonModule],
  exports: [
    AddTimestampPipe
  ]
})
export class SharedModule {}
