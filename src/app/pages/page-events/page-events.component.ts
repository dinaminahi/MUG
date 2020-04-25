import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { AuthService } from './../../shared/auth.service';
import { EventItem } from '../../event-item/event-item';
import { GameCategory } from '../../game-category-icons/game-category';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from './../../components/signin/signin.component';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.scss']
})
export class PageEventsComponent implements OnInit {
  value;
  searchText;
  loading: boolean = true;
  selectedCategories = [];
  geo = { latitude: 49.8377225, longitude: 24.032017, zoom: 15 };
  icons = {
    default: {
      url: 'assets/icons/meeple-blue.svg',
      scaledSize: {
        width: 30,
        height: 30
      }
    },
    active: {
      url: 'assets/icons/meeple-orange.svg',
      scaledSize: {
        width: 30,
        height: 30
      }
    }
  };
  categories: GameCategory[] = [];
  categoriesCurrent: GameCategory[] = [];
  events: EventItem[];
  selectedEvent: EventItem;
  selectedDateTimes: string[] = [];
  selectedGameNames: string[] = [];
  eventDateTimes: string[];
  gameName: string[];
  showMap: boolean = false;

  // Create an instance of the DataService through dependency injection
  constructor(
    private _dataService: DataService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._dataService.eventsShared.subscribe(events => {
      this.events = this.getTodayAndUpcomingEvents(events);
      this.categories && this.filterCategories();
      this.eventDateTimes = this.filterDateTimes();
      this.gameName = this.filterGameName();
    });
    this._dataService.getEvents().subscribe(res => {
      this.loading = false;
    });
    this._dataService.getCategories().subscribe(res => {
      this.categories = res;
      this.events && this.filterCategories();
    });
  }

  toggleShowMap() {
    this.showMap = !this.showMap;
  }

  filterCategories() {
    // Filter out categories which are not exist on any event in current page
    // So each filtering checkbox will show at least one event
    this.categoriesCurrent = this.categories.filter(category =>
      this.events.some(
        event =>
          event.agame[0] &&
          event.agame[0].category &&
          event.agame[0].category.length &&
          event.agame[0].category.indexOf(category.name) !== -1
      )
    );
  }

  filterDateTimes() {
    this.events.forEach(e => {
      e.dateFormated = this.getCustomDates(e.dateTime).filteredLabels;
    });

    // result will contain generated array of all date labels but in random order
    // so instead of this we return a separate getCustomDates().allLabels property
    // which contains the same array but correctly ordered
    // const result = [
    //   ...new Set(
    //     this.events
    //       .map((e) => e.dateFormated)
    //       .reduce((acc, val) => acc.concat(val), [])
    //   ),
    // ];

    return this.getCustomDates().allLabels;
  }

  getCustomDates(eventDateString = '') {
    let endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 99);
    let dayOfWeek = endOfToday.getDay(); //0-6
    let todayDay = endOfToday.getDate();

    let endOfWeek = new Date();
    endOfWeek.setDate(todayDay + (7 - dayOfWeek));
    endOfWeek.setHours(23, 59, 59, 999);

    let endOfNextWeek = new Date();
    endOfNextWeek.setDate(todayDay + (14 - dayOfWeek));
    endOfNextWeek.setHours(23, 59, 59, 999);

    let endOfMonth = new Date(
      endOfToday.getFullYear(),
      endOfToday.getMonth() + 1,
      0
    );
    endOfMonth.setHours(23, 59, 59, 999);

    let eventDate = new Date(eventDateString);

    const customDatesFlags = {
      Today: eventDate.getTime() <= endOfToday.getTime(),
      'This week': eventDate.getTime() <= endOfWeek.getTime(),
      'Next week':
        eventDate.getTime() > endOfWeek.getTime() &&
        eventDate.getTime() <= endOfNextWeek.getTime(),
      'This month': eventDate.getTime() <= endOfMonth.getTime()
    };

    return {
      filteredLabels: Object.keys(customDatesFlags).filter(
        key => customDatesFlags[key]
      ),
      allLabels: Object.keys(customDatesFlags)
    };
  }

  getTodayAndUpcomingEvents(events) {
    return events.filter(e => new Date(e.dateTime) >= new Date());
  }

  filterGameName() {
    return [
      ...new Set(
        this.events.map(event => event.agame[0] && event.agame[0].name)
      )
    ];
  }

  onCategoriesChange(value) {
    this.selectedCategories = value;
  }
  onDateTimeChange(datesCheckedInFilter) {
    this.selectedDateTimes = this.events
      .filter(e => datesCheckedInFilter.some(r => e.dateFormated.includes(r)))
      .map(e => e.dateTime);
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

  goAddEvent() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/pageaddevent']);
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '767px',
      height: '530px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
