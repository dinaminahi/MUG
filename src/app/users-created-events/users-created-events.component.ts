import { Component, Input } from "@angular/core";
import { EventItem } from "../event-item/event-item";

@Component({
  selector: "app-users-created-events",
  templateUrl: "./users-created-events.component.html",
  styleUrls: ["./users-created-events.component.scss"],
})
export class UsersCreatedEventsComponent {
  @Input() createdEvents: EventItem[];
  @Input() isCurrentUser: boolean;
  @Input() userName: string;

  constructor() {}
}
