import { Component, Input } from "@angular/core";
import { EventItem } from "../event-item/event-item";
import { DataService } from "../data.service";
import mongoose from "mongoose";

@Component({
  selector: "app-users-favorites-events",
  templateUrl: "./users-favorites-events.component.html",
  styleUrls: ["./users-favorites-events.component.scss"],
})
export class UsersFavoritesEventsComponent {
  @Input() favoritedEvents: mongoose.Types.ObjectId[];
  events: EventItem[];

  constructor(private _dataService: DataService) {
    this._dataService.getEvents().subscribe((res) => {
      this.events = res.filter(
        (event) => this.favoritedEvents.indexOf(event._id) !== -1
      );
    });
  }
}
