import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../../data.service";
import { EventItem } from "../../event-item/event-item";

@Component({
  selector: "app-page-home",
  templateUrl: "./page-home.component.html",
  styleUrls: ["./page-home.component.scss"],
})
export class PageHomeComponent implements OnInit {
  events: EventItem[];
  constructor(private _dataService: DataService) {
    this._dataService.getEvents().subscribe((res) => (this.events = res));
  }

  ngOnInit(): void {}
}
