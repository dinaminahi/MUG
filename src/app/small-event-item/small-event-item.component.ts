import { Component, Input } from '@angular/core';
import { EventItem } from '../event-item/event-item';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-small-event-item',
  templateUrl: './small-event-item.component.html',
  styleUrls: ['./small-event-item.component.scss']
})
export class SmallEventItemComponent {
  @Input() event: EventItem;

  constructor(private router: Router) {}

  onSelect(event) {
    this.router.navigate(['/events', event._id]);
  }
}
