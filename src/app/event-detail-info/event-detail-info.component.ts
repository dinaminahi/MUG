import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { EventItem } from "../event-item/event-item";
import { Router } from "@angular/router";

@Component({
  selector: "app-event-detail-info",
  templateUrl: "./event-detail-info.component.html",
  styleUrls: ["./event-detail-info.component.scss"]
})
export class EventDetailInfoComponent implements OnInit {
  eventId: number;
  expectedEvent: EventItem;
  public geo = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.eventId = id;
    this.http
      .get("assets/events-extended.json")
      .subscribe((data: EventItem[]) => {
        this.expectedEvent = data.find(event => event.id === this.eventId);
        this.geo.push(this.expectedEvent.location.geo);
        console.log(this.geo);
      });
  }

  gotoEvents() {
    this.router.navigate(["/events"]);
  }
}
