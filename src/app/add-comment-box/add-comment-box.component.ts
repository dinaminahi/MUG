import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from './../data.service';

@Component({
  selector: 'app-add-comment-box',
  templateUrl: './add-comment-box.component.html',
  styleUrls: ['./add-comment-box.component.scss']
})
export class AddCommentBoxComponent implements OnInit {

  @Input() eventId: string;
  commentForm: FormGroup;

  constructor(private fb: FormBuilder,  private _dataService: DataService) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: '',
      date: new Date().toLocaleString(),
      userId: "5e8e4093a918542dd08423be",
      eventId: this.eventId
    });
  }

  onSubmit() {
    this._dataService.addComment(this.commentForm.value);
    this.commentForm.reset();
    window.location.reload();
  }
}
