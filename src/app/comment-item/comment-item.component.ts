import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { UserItem } from './../components/user-profile/user';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: Comment;

  currentUser: UserItem;

  constructor() { }

  ngOnInit(): void {

    console.log(this.comment);
  }

}
