import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from './../data.service';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-add-comment-box',
  templateUrl: './add-comment-box.component.html',
  styleUrls: ['./add-comment-box.component.scss']
})
export class AddCommentBoxComponent implements OnInit {

  @Input() eventId: string;
  commentForm: FormGroup;

  constructor(private fb: FormBuilder,  private _dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {

    let userId = this.authService.UserId;
    let name = this.authService.UserName;
    let photo = this.authService.UserPhoto;

    this.commentForm = this.fb.group({
      text: '',
      date: new Date().toLocaleString(),
      userId: userId,
      user: this.fb.group({
         personal: this.fb.group({
           name: name,
           photoUrl: photo
         })
      }),
      eventId: this.eventId
    });
  }

  onSubmit() {
    this._dataService.comments.push(this.commentForm.value);
    this._dataService.addComment(this.commentForm.value);
  }
}
