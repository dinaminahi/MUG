import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainNavbarComponent } from './layout-main-navbar.component';

describe('LayoutMainNavbarComponent', () => {
  let component: LayoutMainNavbarComponent;
  let fixture: ComponentFixture<LayoutMainNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMainNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
