import { Component, Input } from "@angular/core";
import { EventItem } from "../event-item/event-item";

@Component({
  selector: "app-users-subscribed-events",
  templateUrl: "./users-subscribed-events.component.html",
  styleUrls: ["./users-subscribed-events.component.scss"],
})
export class UsersSubscribedEventsComponent {
  @Input() subscribedEvents: EventItem[];

  constructor() {}
}
