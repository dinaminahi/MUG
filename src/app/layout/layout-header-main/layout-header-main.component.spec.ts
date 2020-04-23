import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHeaderMainComponent } from './layout-header-main.component';

describe('LayoutHeaderMainComponent', () => {
  let component: LayoutHeaderMainComponent;
  let fixture: ComponentFixture<LayoutHeaderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutHeaderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHeaderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
