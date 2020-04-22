import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForCancelBtnComponent } from './dialog-for-cancel-btn.component';

describe('DialogForCancelBtnComponent', () => {
  let component: DialogForCancelBtnComponent;
  let fixture: ComponentFixture<DialogForCancelBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForCancelBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForCancelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
