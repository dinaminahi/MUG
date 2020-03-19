import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import the DataService
import { DataService } from '../../data.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.scss']
})

export class PageEventsComponent implements OnInit {

  public events = [];
  // // Define a events property to hold our event data
  // events: Array<any>;

  // // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: Router) {

    // Access the Data Service's getEvents() method we defined
    // this._dataService.getEvents()
    //     .subscribe(res => this.events = res);
    // this.events = this._dataService.getEvents();

  }

  ngOnInit(): void {
     this.events = this._dataService.getEvents();
  }

  onSelect(event) {
    this.route.navigate(['events', event.id]);
  }

}


