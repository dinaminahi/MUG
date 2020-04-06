import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { EventItem } from "../event-item/event-item";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

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
    private router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.eventId = id;
    this._dataService.getEventById(this.eventId).subscribe(res => {
      this.expectedEvent = res;
      this.geo.push(this.expectedEvent.location.geo);
    });
  }

  gotoEvents() {
    this.router.navigate(["/events"]);
  }
}
