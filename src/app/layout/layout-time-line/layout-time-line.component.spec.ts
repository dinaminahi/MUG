import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTimeLineComponent } from './layout-time-line.component';

describe('LayoutTimeLineComponent', () => {
  let component: LayoutTimeLineComponent;
  let fixture: ComponentFixture<LayoutTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
