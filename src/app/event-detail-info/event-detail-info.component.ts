import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventItem } from '../event-item/event-item';
import { Comment } from './../comment-item/comment';
import { DataService } from '../data.service';
import { AuthService } from './../shared/auth.service';
import { UserItem } from './../components/user-profile/user';

@Component({
  selector: 'app-event-detail-info',
  templateUrl: './event-detail-info.component.html',
  styleUrls: ['./event-detail-info.component.scss']
})
export class EventDetailInfoComponent implements OnInit {
  expectedEvent: EventItem;
  expectedUser: UserItem;
  geo: Object;
  comments: Comment[];
  eventId: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let userId = this.authService.UserId;

    let id = this.route.snapshot.paramMap.get('id');
    this.eventId = id;

    this._dataService.getEventById(id).subscribe(res => {
      this.expectedEvent = res[0];
      console.log(this.expectedEvent);
      this.geo = this.expectedEvent.location.geo;
    });

    this._dataService.getUserById(userId).subscribe(res => {
      this.expectedUser = res[0];
    });

    this._dataService.getComments(id).subscribe(res => {
      this.comments = res;
    });
  }

  gotoEvents() {
    this.router.navigate(['/events']);
  }
}
