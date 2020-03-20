import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailInfoComponent } from './event-detail-info.component';

describe('EventDetailInfoComponent', () => {
  let component: EventDetailInfoComponent;
  let fixture: ComponentFixture<EventDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
