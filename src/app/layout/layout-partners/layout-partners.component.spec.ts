import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPartnersComponent } from './layout-partners.component';

describe('LayoutPartnersComponent', () => {
  let component: LayoutPartnersComponent;
  let fixture: ComponentFixture<LayoutPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
