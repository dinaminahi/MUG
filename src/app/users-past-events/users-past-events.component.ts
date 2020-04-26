import { Component, OnInit, Input } from '@angular/core';
import { EventItem } from './../event-item/event-item';

@Component({
  selector: 'app-users-past-events',
  templateUrl: './users-past-events.component.html',
  styleUrls: ['./users-past-events.component.scss']
})
export class UsersPastEventsComponent implements OnInit {
  @Input() subscribedPastEvents: EventItem[];

  constructor() {}

  ngOnInit(): void {}
}
