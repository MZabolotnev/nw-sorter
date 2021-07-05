import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-controller-input',
  templateUrl: './controller-input.component.html',
  styleUrls: ['./controller-input.component.less']
})
export class ControllerInputComponent implements OnInit {
  @Input()
  text: string;

  @Input()
  set value(value: string) {
    this.currentValue = value;
  }

  get value(): string {
    return this.currentValue;
  }

  @Input()
  set disabled(value: boolean) {
    this.currentDisabled = value;
  }

  get disabled(): boolean {
    return this.currentDisabled;
  }

  @Output() update: EventEmitter<string> = new EventEmitter();

  currentValue: string;
  currentDisabled: boolean;

  constructor() {}

  ngOnInit(): void {}

  change(event: Event | null) {
    const target = event?.target as any;
    this.update.emit(target.value);
  }

}
