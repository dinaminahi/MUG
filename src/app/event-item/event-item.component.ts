import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventItem } from './event-item';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UserItem } from '../components/user-profile/user';
// import { GameComponent } from "../game/game.component";
import { from } from 'rxjs';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit, OnChanges {
  @Input() event: EventItem;
  user: UserItem;
  organizer: any;
  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.event) {
      this.authService.getUserProfile(this.event.organizer).subscribe(res => {
        this.organizer = res.msg;
      });
    }
  }

  onSelect(event) {
    this.router.navigate(['/events', event._id]);
  }

  redirectToUserPage(user) {
    this.router.navigate(['/user-profile', user._id]);
  }
}
