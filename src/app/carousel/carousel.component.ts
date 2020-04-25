import {
  Component,
  OnInit,
  Input,
  OnChanges,
  HostListener,
} from "@angular/core";
import { DataService } from "../data.service";
import { EventItem } from "../event-item/event-item";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, OnChanges {
  events: EventItem[];
  slides1: any = [[]];
  slides2: any = [[]];
  slides3: any = [[]];
  carouselDisplayMode: number;
  TABLET_BREAKPOINT: number = 768;
  DESKTOP_BREAKPOINT: number = 1024;

  constructor(private _dataService: DataService) {}

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  switchLayout() {
    if (window.innerWidth < this.TABLET_BREAKPOINT) {
      this.carouselDisplayMode = 1;
    } else if (
      this.TABLET_BREAKPOINT < window.innerWidth &&
      window.innerWidth < this.DESKTOP_BREAKPOINT
    ) {
      this.carouselDisplayMode = 2;
    } else {
      this.carouselDisplayMode = 3;
    }
  }
  ngOnChanges() {}
  @HostListener("window:resize")
  onWindowResize() {
    if (this.events) {
      this.switchLayout();
    }
  }

  ngOnInit(): void {
    this._dataService.getEvents().subscribe((events) => {
      if (events) {
        this.events = this.filterNexTenDaysEvents(events);
        this.slides1 = this.events;
        this.slides2 = this.chunk(this.events, 2);
        this.slides3 = this.chunk(this.events, 3);
        this.switchLayout();
      }
    });
  }

  filterNexTenDaysEvents(events) {
    return events.filter((e) => {
      const today = new Date();

      const endDate = new Date();
      endDate.setDate(today.getDate() + 10);
      endDate.setHours(23, 59, 59, 99);

      const eventDate = new Date(e.dateTime);

      return (
        eventDate.getTime() >= today.getTime() &&
        eventDate.getTime() <= endDate.getTime()
      );
    });
  }
}
