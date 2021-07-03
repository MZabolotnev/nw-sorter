import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerCheckboxComponent } from './controller-checkbox.component';

describe('ControllerCheckboxComponent', () => {
  let component: ControllerCheckboxComponent;
  let fixture: ComponentFixture<ControllerCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
