import { Component, Input } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import mongoose from 'mongoose';

@Component({
  selector: 'app-users-subscribed-events',
  templateUrl: './users-subscribed-events.component.html',
  styleUrls: ['./users-subscribed-events.component.scss']
})
export class UsersSubscribedEventsComponent {
  @Input() subscribedEvents: mongoose.Types.ObjectId[];
  events: EventItem[];
  constructor(private _dataService: DataService, private router: Router) {
    this._dataService.getEvents().subscribe(res => {
      this.events = res.filter(
        event => this.subscribedEvents.indexOf(event._id) !== -1
      );
    });
  }

  goToEvents() {
    this.router.navigate(['/events']);
  }
}
