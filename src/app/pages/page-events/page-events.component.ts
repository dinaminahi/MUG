import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../../data.service";
import { EventItem } from "../../event-item/event-item";
import { CheckboxItem } from "../../filter-category/checkbox-item";

@Component({
  selector: "app-page-events",
  templateUrl: "./page-events.component.html",
  styleUrls: ["./page-events.component.scss"]
})
export class PageEventsComponent implements OnInit {
  selectedCategories = [];
  geo = { latitude: 49.8377225, longitude: 24.032017, zoom: 15 };
  icons = {
    default: {
      url: "assets/icons/meeple-blue.svg",
      scaledSize: {
        width: 30,
        height: 30
      }
    },
    active: {
      url: "assets/icons/meeple-orange.svg",
      scaledSize: {
        width: 30,
        height: 30
      }
    }
  };

  categories: CheckboxItem[] = [];
  //   { value: "Новачкам", label: "Новачкам" },
  //   { value: "Швидкі", label: "Швидкі" },
  //   { value: "Дорожні", label: "Дорожні" },
  //   { value: "Пригоди", label: "Пригоди" },
  //   { value: "Для підлітків", label: "Для підлітків" },
  //   { value: "Гікам", label: "Гікам" },
  //   { value: "Соло", label: "Соло" },
  //   { value: "Стратегії", label: "Стратегії" },
  //   { value: "Логічні", label: "Логічні" },
  //   { value: "Сімейні", label: "Сімейні" }
  // ];

  events: EventItem[];
  selectedEvent: EventItem;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this._dataService.getEvents().subscribe(res => {
      this.events = res;
      console.log(this.events);
    });
    this._dataService.getCategories().subscribe(
      res =>
        (this.categories = res.map(category => {
          return { value: category, label: category };
        }))
    );
  }

  ngOnInit(): void {}

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
