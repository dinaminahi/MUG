import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFavoritesEventsComponent } from './users-favorites-events.component';

describe('UsersFavoritesEventsComponent', () => {
  let component: UsersFavoritesEventsComponent;
  let fixture: ComponentFixture<UsersFavoritesEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFavoritesEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFavoritesEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
