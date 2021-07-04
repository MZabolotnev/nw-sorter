import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NOTIFICATIONS } from '../../../shared/constants/notifications';

@Component({
  selector: 'app-controller-checkbox',
  templateUrl: './controller-checkbox.component.html',
  styleUrls: ['./controller-checkbox.component.less'],
})
export class ControllerCheckboxComponent implements OnInit {
  @Input()
  text: string;

  @Input()
  set checked(checked: boolean) {
    this.currentChecked = checked;
  }

  get checked(): boolean {
    return this.currentChecked;
  }

  @Output() update: EventEmitter<boolean> = new EventEmitter();

  currentChecked: boolean;

  constructor() {}

  ngOnInit(): void {}

  change(event: Event | null) {
    const target = event?.target as any;
    this.update.emit(target.checked);
  }
}
