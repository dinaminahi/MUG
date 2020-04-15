import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EventItem } from "./event-item";
import { Router } from "@angular/router";
// import { GameComponent } from "../game/game.component";
import { from } from "rxjs";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"],
})
export class EventItemComponent implements OnInit {
  @Input() event: EventItem;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  onSelect(event) {
    this.router.navigate(["/events", event._id]);
  }
}
