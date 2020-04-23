import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavGameNamesComponent } from './fav-game-names.component';

describe('FavGameNamesComponent', () => {
  let component: FavGameNamesComponent;
  let fixture: ComponentFixture<FavGameNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavGameNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavGameNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
