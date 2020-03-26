import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ParticipantsCountComponent } from "./participants-count.component";

describe("ParticipantsCountComponent", () => {
  let component: ParticipantsCountComponent;
  let fixture: ComponentFixture<ParticipantsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantsCountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
