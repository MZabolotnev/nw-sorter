import { Component, Input, OnInit } from '@angular/core';
import { ILoadingValue } from '../../interfaces/interface';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less'],
})
export class LoadingComponent implements OnInit {
  @Input()
  set text(value: string) {
    this.currentText = value;
  }

  get text(): string {
    return this.currentText;
  }

  @Input()
  set value(value: ILoadingValue) {
    this.currentValue = value;
  }

  get value(): ILoadingValue {
    return this.currentValue;
  }

  currentText: string;
  currentValue: ILoadingValue;

  constructor() {}

  ngOnInit(): void {}
}
