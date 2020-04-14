import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { AuthService } from './../shared/auth.service';
import { DataService } from './../data.service';
import { UserItem } from './../components/user-profile/user';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: Comment;

  currentUser: UserItem;

  constructor(private _dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {

    let currUserId = this.authService.UserId;

    this._dataService.getUserById(currUserId).subscribe((res) => {
        this.currentUser = res[0];
    });

    console.log(this.comment);
  }

}
