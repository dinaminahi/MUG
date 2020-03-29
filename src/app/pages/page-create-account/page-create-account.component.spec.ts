import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreateAccountComponent } from './page-create-account.component';

describe('PageCreateAccountComponent', () => {
  let component: PageCreateAccountComponent;
  let fixture: ComponentFixture<PageCreateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
