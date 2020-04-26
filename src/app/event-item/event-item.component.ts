import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { EventItem } from "./event-item";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"],
})
export class EventItemComponent implements OnInit, OnChanges {
  @Input() event: EventItem;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  ngOnChanges() {}

  onSelect(event) {
    this.router.navigate(["/events", event._id]);
  }

  redirectToUserPage(user) {
    this.router.navigate(["/useraccount", user._id]);
  }
}
