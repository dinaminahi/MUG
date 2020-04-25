import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { EventItem } from "../event-item/event-item";
import { DataService } from "../data.service";

@Component({
  selector: "app-users-subscribed-events",
  templateUrl: "./users-subscribed-events.component.html",
  styleUrls: ["./users-subscribed-events.component.scss"],
})
export class UsersSubscribedEventsComponent implements OnInit, OnChanges {
  @Input() subscribedEvents: string;
  events: EventItem[];
  allEvents: EventItem[];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this._dataService.getEvents().subscribe((res) => {
      this.allEvents = res;
      this.updateSubscribedEventsData();
    });
  }

  updateSubscribedEventsData() {
    if (!this.subscribedEvents || !this.allEvents) {
      return false;
    }

    this.events = this.allEvents.filter(
      (event) => this.subscribedEvents.indexOf(event._id) !== -1
    );
  }

  ngOnChanges() {
    this.updateSubscribedEventsData();
  }
}
