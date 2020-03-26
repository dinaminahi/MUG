import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { EventItem } from "../event-item/event-item";
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-detail-info',
  templateUrl: './event-detail-info.component.html',
  styleUrls: ['./event-detail-info.component.scss']
})
export class EventDetailInfoComponent implements OnInit {

  eventId: number;
  expectedEvent: EventItem;
  geo: object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
     this.eventId = id;
     this.http
     .get("assets/events-extended.json")
     .subscribe((data: EventItem[]) => { 
       this.expectedEvent = data.find(event => event.id = this.eventId);
       this.geo = this.expectedEvent.location.geo;
      });
  }

  gotoEvents() {
    this.router.navigate(['/events']);
  }
}
