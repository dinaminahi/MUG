import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventItem } from '../event-item/event-item';
import { Comment } from './../comment-item/comment';
import { DataService } from '../data.service';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-event-detail-info',
  templateUrl: './event-detail-info.component.html',
  styleUrls: ['./event-detail-info.component.scss']
})
export class EventDetailInfoComponent implements OnInit {
  expectedEvent: EventItem;
  geo: Object;
  comments: Comment[];
  eventId: string;
  organizor: object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.eventId = id;

    this._dataService.getEventById(id).subscribe(res => {
      this.expectedEvent = res[0];
      this.geo = this.expectedEvent.location.geo;
      this.organizor = res[0].organizerInfo[0];
    });

    this._dataService.getComments(id).subscribe(res => {
      this.comments = res;
    });
  }

  gotoEvents() {
    this.router.navigate(['/events']);
  }
}
