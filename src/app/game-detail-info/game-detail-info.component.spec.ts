import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailInfoComponent } from './game-detail-info.component';

describe('GameDetailInfoComponent', () => {
  let component: GameDetailInfoComponent;
  let fixture: ComponentFixture<GameDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
