import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEventsRuletteComponent } from './layout-events-rulette.component';

describe('LayoutEventsRuletteComponent', () => {
  let component: LayoutEventsRuletteComponent;
  let fixture: ComponentFixture<LayoutEventsRuletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutEventsRuletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEventsRuletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
