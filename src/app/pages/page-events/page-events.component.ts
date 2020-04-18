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

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this._dataService.getEvents().subscribe((res) => {
      this.events = res;
      this.categories && this.filterCategories();
    });
    this._dataService.getCategories().subscribe((res) => {
      this.categories = res;
      this.events && this.filterCategories();
    });
  }

  ngOnInit(): void {}

  filterCategories() {
    // Filter out categories which are not exist on any event in current page
    // So each filtering checkbox will show at least one event
    this.categoriesCurrent = this.categories.filter((category) =>
      this.events.some(
        (event) => event.agame[0].category.indexOf(category.name) !== -1
      )
    );
  }

  onCategoriesChange(value) {
    this.selectedCategories = value;
  }

  highlightItem(event) {
    if (this.selectedEvent === event) {
      this.selectedEvent = null;
    } else {
      this.selectedEvent = event;
    }
  }
}
