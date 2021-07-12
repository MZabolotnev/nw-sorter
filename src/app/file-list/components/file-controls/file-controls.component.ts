import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-controls',
  templateUrl: './file-controls.component.html',
  styleUrls: ['./file-controls.component.less'],
})
export class FileControlsComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  set checked(checked: boolean) {
    this.currentChecked = checked;
  }

  get checked(): boolean {
    return this.currentChecked;
  }
  @Output() update: EventEmitter<{
    name: string;
    checked: boolean;
  }> = new EventEmitter();

  currentChecked: boolean;

  constructor() {}

  ngOnInit(): void {}

  change(event: Event | null) {
    const target = event?.target as any;
    const { checked } = target;
    const { name } = this;
    this.update.emit({ name, checked });
  }
}
