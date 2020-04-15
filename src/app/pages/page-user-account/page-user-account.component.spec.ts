import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PageUserAccountComponent } from "./page-user-account.component";

describe("PageUserAccountComponent", () => {
  let component: PageUserAccountComponent;
  let fixture: ComponentFixture<PageUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageUserAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
