import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGameNameComponent } from './filter-game-name.component';

describe('FilterGameNameComponent', () => {
  let component: FilterGameNameComponent;
  let fixture: ComponentFixture<FilterGameNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGameNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGameNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
