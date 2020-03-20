import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTeamComponent } from './layout-team.component';

describe('LayoutTeamComponent', () => {
  let component: LayoutTeamComponent;
  let fixture: ComponentFixture<LayoutTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
