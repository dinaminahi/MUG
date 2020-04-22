import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatedEventItemComponent } from './user-created-event-item.component';

describe('UserCreatedEventItemComponent', () => {
  let component: UserCreatedEventItemComponent;
  let fixture: ComponentFixture<UserCreatedEventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreatedEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreatedEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
