import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentBoxComponent } from './add-comment-box.component';

describe('AddCommentBoxComponent', () => {
  let component: AddCommentBoxComponent;
  let fixture: ComponentFixture<AddCommentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
