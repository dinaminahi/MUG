import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFeaturesComponent } from './layout-features.component';

describe('LayoutFeaturesComponent', () => {
  let component: LayoutFeaturesComponent;
  let fixture: ComponentFixture<LayoutFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
