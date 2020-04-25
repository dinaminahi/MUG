import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { EventItem } from "../event-item/event-item";
import { DataService } from "../data.service";

@Component({
  selector: "app-users-favorites-events",
  templateUrl: "./users-favorites-events.component.html",
  styleUrls: ["./users-favorites-events.component.scss"],
})
export class UsersFavoritesEventsComponent implements OnInit, OnChanges {
  @Input() favoritedEvents: string;
  events: EventItem[];
  allEvents: EventItem[];

  constructor(private _dataService: DataService) {}
  ngOnInit(): void {
    this._dataService.getEvents().subscribe((res) => {
      this.allEvents = res;
      this.updateFavoritedEventsData();
    });
  }

  updateFavoritedEventsData() {
    if (!this.favoritedEvents || !this.allEvents) {
      return false;
    }

    this.events = this.allEvents.filter(
      (event) => this.favoritedEvents.indexOf(event._id) !== -1
    );
  }

  ngOnChanges() {
    this.updateFavoritedEventsData();
  }
}
