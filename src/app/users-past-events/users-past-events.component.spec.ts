import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPastEventsComponent } from './users-past-events.component';

describe('UsersPastEventsComponent', () => {
  let component: UsersPastEventsComponent;
  let fixture: ComponentFixture<UsersPastEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPastEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPastEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
