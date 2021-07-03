import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerNameComponent } from './controller-name.component';

describe('ControllerNameComponent', () => {
  let component: ControllerNameComponent;
  let fixture: ComponentFixture<ControllerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
