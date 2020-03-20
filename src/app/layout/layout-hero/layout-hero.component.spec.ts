import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHeroComponent } from './layout-hero.component';

describe('LayoutHeroComponent', () => {
  let component: LayoutHeroComponent;
  let fixture: ComponentFixture<LayoutHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
