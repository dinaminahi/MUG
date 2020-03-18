import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EventItem } from "./event-item";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"]
})
export class EventItemComponent implements OnInit {
  event: EventItem;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("assets/event-object.json")
      .subscribe((data: EventItem) => (this.event = data));
  }
}
