import { Component, Input } from "@angular/core";
import { EventItem } from "../event-item/event-item";

@Component({
  selector: "app-users-favorites-events",
  templateUrl: "./users-favorites-events.component.html",
  styleUrls: ["./users-favorites-events.component.scss"],
})
export class UsersFavoritesEventsComponent {
  @Input() favoritedEvents: EventItem[];

  constructor() {}
}
