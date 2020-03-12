import { Component, OnInit } from '@angular/core';
// Import the DataService
import { DataService } from '../../data.service';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.scss']
})

export class PageEventsComponent implements OnInit {

  // Define a events property to hold our event data
  events: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getEvents() method we defined
    this._dataService.getEvents()
        .subscribe(res => this.events = res);
  }

  ngOnInit(): void {
  }

}


