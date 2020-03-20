import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContactsComponent } from './layout-contacts.component';

describe('LayoutContactsComponent', () => {
  let component: LayoutContactsComponent;
  let fixture: ComponentFixture<LayoutContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
