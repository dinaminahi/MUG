import { Component, OnInit, Input } from "@angular/core";
import { EventItem } from "../event-item/event-item";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-small-event-item",
  templateUrl: "./small-event-item.component.html",
  styleUrls: ["./small-event-item.component.scss"],
})
export class SmallEventItemComponent implements OnInit {
  @Input() event: EventItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.event);
  }

  onSelect(event) {
    this.router.navigate(["/events", event.id]);
  }
}
