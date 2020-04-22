import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventItem } from './../event-item/event-item';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
@Component({
  selector: 'app-user-created-event-item',
  templateUrl: './user-created-event-item.component.html',
  styleUrls: ['./user-created-event-item.component.scss']
})
export class UserCreatedEventItemComponent implements OnInit {
  @Input() event: EventItem;
  cancel: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cancel = this.event.canceled;
  }

  onSelect(event) {
    this.router.navigate(['/events', event._id]);
  }

  cancelEvent(eventId: string, userId: string) {
    if (!this.cancel) {
      this.cancel = true;
      console.log(eventId);
      console.log(userId);
    }
  }
}
