import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFavoritesGamesComponent } from './users-favorites-games.component';

describe('UsersFavoritesGamesComponent', () => {
  let component: UsersFavoritesGamesComponent;
  let fixture: ComponentFixture<UsersFavoritesGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFavoritesGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFavoritesGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
