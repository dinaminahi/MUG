import { Component, Input } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-favorites-events',
  templateUrl: './users-favorites-events.component.html',
  styleUrls: ['./users-favorites-events.component.scss']
})
export class UsersFavoritesEventsComponent {
  @Input() favoritedEvents: string;
  events: EventItem[];

  constructor(private _dataService: DataService, private router: Router) {
    this._dataService.getEvents().subscribe(res => {
      this.events = res.filter(
        event => this.favoritedEvents.indexOf(event._id) !== -1
      );
    });
  }

  goToEvents() {
    this.router.navigate(['/events']);
  }
}
