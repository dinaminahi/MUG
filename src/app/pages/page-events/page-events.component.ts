import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data.service";
import { EventItem } from "../../event-item/event-item";
import { GameCategory } from "../../game-category-icons/game-category";

@Component({
  selector: "app-page-events",
  templateUrl: "./page-events.component.html",
  styleUrls: ["./page-events.component.scss"],
})
export class PageEventsComponent implements OnInit {
  searchText;
  loading: boolean = true;
  selectedCategories = [];
  geo = { latitude: 49.8377225, longitude: 24.032017, zoom: 15 };
  icons = {
    default: {
      url: "assets/icons/meeple-blue.svg",
      scaledSize: {
        width: 30,
        height: 30,
      },
    },
    active: {
      url: "assets/icons/meeple-orange.svg",
      scaledSize: {
        width: 30,
        height: 30,
      },
    },
  };
  categories: GameCategory[] = [];
  categoriesCurrent: GameCategory[] = [];
  events: EventItem[];
  selectedEvent: EventItem;
  selectedDateTimes: string[] = [];
  selectedGameNames: string[] = [];
  eventDateTimes: string[];
  gameName: string[];

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.loading = true;
    this._dataService.eventsShared.subscribe((events) => {
      this.events = this.getTodayAndUpcomingEvents(events);
      this.categories && this.filterCategories();
      this.eventDateTimes = this.filterDateTimes();
      this.gameName = this.filterGameName();
    });
    this._dataService.getEvents().subscribe((res) => {
      this.loading = false;
    });
    this._dataService.getCategories().subscribe((res) => {
      this.categories = res;
      this.events && this.filterCategories();
    });
  }

  filterCategories() {
    // Filter out categories which are not exist on any event in current page
    // So each filtering checkbox will show at least one event
    this.categoriesCurrent = this.categories.filter((category) =>
      this.events.some(
        (event) =>
          event.agame[0] &&
          event.agame[0].category &&
          event.agame[0].category.length &&
          event.agame[0].category.indexOf(category.name) !== -1
      )
    );
  }

  filterDateTimes() {
    // Filter unique dates of all event in current page
    // Format a date string based on event.dateTime which will not contain a hours/minutes,
    // so we will have less unique dates if a low of events happen in a same date
    // save this string to custom event.dateFormated property to mach event after filtering happens by the dateFormated string
    // so the original event.dateTime could be passed to the filter pipe
    this.events.forEach((e) => {
      const date = new Date(e.dateTime);
      e.dateFormated = `${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }.${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }.${date.getFullYear()}`;
    });

    return [...new Set(this.events.map((e) => e.dateFormated))];
  }

  getTodayAndUpcomingEvents(events) {
    return events.filter((e) => new Date(e.dateTime) >= new Date());
  }

  filterGameName() {
    return [
      ...new Set(
        this.events.map((event) => event.agame[0] && event.agame[0].name)
      ),
    ];
  }

  onCategoriesChange(value) {
    this.selectedCategories = value;
  }
  onDateTimeChange(datesCheckedInFilter) {
    this.selectedDateTimes = this.events
      .filter((e) => datesCheckedInFilter.includes(e.dateFormated))
      .map((e) => e.dateTime);
  }
  onGameNameChange(names) {
    this.selectedGameNames = names;
  }

  highlightItem(event) {
    if (this.selectedEvent === event) {
      this.selectedEvent = null;
    } else {
      this.selectedEvent = event;
    }
  }
}
