import { Component, Input } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-created-events',
  templateUrl: './users-created-events.component.html',
  styleUrls: ['./users-created-events.component.scss']
})
export class UsersCreatedEventsComponent {
  @Input() createdEvents: string;
  events: EventItem[];
  constructor(private _dataService: DataService, private router: Router) {
    this._dataService.getEvents().subscribe(res => {
      this.events = res.filter(
        event => this.createdEvents.indexOf(event._id) !== -1
      );
    });
  }

  goToAddEvent() {
    this.router.navigate(['/addevent']);
  }
}
