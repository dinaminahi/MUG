import { Component, OnInit, Input } from "@angular/core";
// Import the DataService
import { DataService } from "../../data.service";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { EventItem } from "../../event-item/event-item";

@Component({
  selector: "app-page-events",
  templateUrl: "./page-events.component.html",
  styleUrls: ["./page-events.component.scss"]
})
export class PageEventsComponent implements OnInit {
  // Define a events property to hold our event data
  events: EventItem[];

  // Create an instance of the DataService through dependency injection
  constructor(private http: HttpClient) {}
  //  constructor(private _dataService: DataService) {
  // Access the Data Service's getEvents() method we defined
  //    this._dataService.getEvents().subscribe(res => (this.events = res));
  // this._dataService.getEvents().subscribe(res => (this.events = res));
  //  }

  ngOnInit(): void {
    this.http
      .get("assets/events-extended.json")
      .subscribe((data: EventItem[]) => (this.events = data));

    // this.http
    //  .get("assets/event-object.json")
    //  .subscribe((data: EventItem) => (this.event = data));


    console.log(this.events);
  }
}
