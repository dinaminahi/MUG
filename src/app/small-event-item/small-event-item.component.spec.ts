import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallEventItemComponent } from './small-event-item.component';

describe('SmallEventItemComponent', () => {
  let component: SmallEventItemComponent;
  let fixture: ComponentFixture<SmallEventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
