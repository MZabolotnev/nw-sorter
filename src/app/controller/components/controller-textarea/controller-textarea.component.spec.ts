import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerTextareaComponent } from './controller-textarea.component';

describe('ControllerTextareaComponent', () => {
  let component: ControllerTextareaComponent;
  let fixture: ComponentFixture<ControllerTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
