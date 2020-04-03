import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddEventComponent } from './page-add-event.component';

describe('PageAddEventComponent', () => {
  let component: PageAddEventComponent;
  let fixture: ComponentFixture<PageAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
