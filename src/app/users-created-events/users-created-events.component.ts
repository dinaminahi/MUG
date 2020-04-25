import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { EventItem } from "../event-item/event-item";
import { DataService } from "../data.service";

@Component({
  selector: "app-users-created-events",
  templateUrl: "./users-created-events.component.html",
  styleUrls: ["./users-created-events.component.scss"],
})
export class UsersCreatedEventsComponent implements OnInit, OnChanges {
  @Input() createdEvents: string;
  events: EventItem[];
  allEvents: EventItem[];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this._dataService.getEvents().subscribe((res) => {
      this.allEvents = res;
      this.updateCreatedEventsData();
    });
  }

  updateCreatedEventsData() {
    if (!this.createdEvents || !this.allEvents) {
      return false;
    }

    this.events = this.allEvents.filter(
      (event) => this.createdEvents.indexOf(event._id) !== -1
    );
  }

  ngOnChanges() {
    this.updateCreatedEventsData();
  }
}
