import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSubscribedEventsComponent } from './users-subscribed-events.component';

describe('UsersSubscribedEventsComponent', () => {
  let component: UsersSubscribedEventsComponent;
  let fixture: ComponentFixture<UsersSubscribedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSubscribedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSubscribedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
