import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTimestampPipe } from './pipes/add-timestamp.pipe';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [AddTimestampPipe, LoadingComponent],
  imports: [CommonModule],
  exports: [AddTimestampPipe, LoadingComponent],
  providers: [AddTimestampPipe],
})
export class SharedModule {}
