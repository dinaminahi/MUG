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
  expectedEvent: EventItem;
  geo: Object;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this._dataService.getEventById(id).subscribe(res => {
      this.expectedEvent = res[0];
      this.geo = this.expectedEvent.location.geo;
      console.log(this.geo);
    });
  }

  gotoEvents() {
    this.router.navigate(["/events"]);
  }
}
