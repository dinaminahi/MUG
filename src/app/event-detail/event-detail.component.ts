import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  public events = [];
  public eventId;

  constructor(private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.events = this._dataService.getEvents();
     let id = parseInt(this.route.snapshot.paramMap.get('id'));
     this.eventId = id;
  }
}
