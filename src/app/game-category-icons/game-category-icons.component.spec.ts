import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCategoryIconsComponent } from './game-category-icons.component';

describe('GameCategoryIconsComponent', () => {
  let component: GameCategoryIconsComponent;
  let fixture: ComponentFixture<GameCategoryIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCategoryIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCategoryIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
