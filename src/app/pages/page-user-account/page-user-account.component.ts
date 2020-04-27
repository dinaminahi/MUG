import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserItem } from 'src/app/components/user-profile/user';
import { DataService } from '../../data.service';
import { EventItem } from '../../event-item/event-item';
import { Game } from 'src/app/game/game';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-user-account',
  templateUrl: './page-user-account.component.html',
  styleUrls: ['./page-user-account.component.scss']
})
export class PageUserAccountComponent implements OnInit {
  public user: UserItem;

  joined: boolean = true;
  pastEvents: boolean = false;
  created: boolean = false;
  favouriteEvents: boolean = false;
  favouriteGames: boolean = false;
  events: EventItem[] = [];
  isCurrentUser: boolean;
  userDataSubscription: Subscription;
  allEvents: EventItem[] = [];
  allGames: Game[] = [];

  subscribedFutureEvents: EventItem[] = [];
  subscribedPastEvents: EventItem[] = [];
  favoritedEvents: EventItem[] = [];
  createdEvents: EventItem[] = [];
  favoritedGames: Game[] = [];

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.pipe(map(p => p.id)).subscribe(id => {
      this.getUserData(id);
    });

    this._dataService.getEvents().subscribe(res => {
      this.allEvents = res;
      this.updateFilteredEventsData();
    });

    this._dataService.getGames().subscribe(res => {
      this.allGames = res;
      this.updateFilteredGamesData();
    });
  }

  getUserData(id) {
    this.userDataSubscription && this.userDataSubscription.unsubscribe();
    if (id === this.authService.UserId) {
      this.isCurrentUser = true;
      this.userDataSubscription = this.authService
        .getCurrentUserData()
        .subscribe(user => {
          this.user = user;
          this.updateFilteredEventsData();
          this.updateFilteredGamesData();
        });
    } else {
      this.isCurrentUser = false;
      this.userDataSubscription = this.authService
        .getUserProfile(id)
        .subscribe(res => {
          this.user = res.msg;
          this.updateFilteredEventsData();
          this.updateFilteredGamesData();
        });
    }
  }

  joinedClick() {
    this.joined = true;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = false;
    this.pastEvents = false;
  }

  createdClick() {
    this.joined = false;
    this.created = true;
    this.favouriteEvents = false;
    this.favouriteGames = false;
    this.pastEvents = false;
  }

  favouriteEventsClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = true;
    this.favouriteGames = false;
    this.pastEvents = false;
  }

  favouriteGamesClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = true;
    this.pastEvents = false;
  }

  pastEventsClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = false;
    this.pastEvents = true;
  }

  getTodayAndUpcomingEvents(events) {
    return events.filter(e => new Date(e.dateTime) >= new Date());
  }

  updateFilteredEventsData() {
    if (!this.user || !this.allEvents) {
      return false;
    }

    this.subscribedFutureEvents = this.allEvents.filter(
      event =>
        this.user.events.subscribed.indexOf(event._id) !== -1 &&
        new Date(event.dateTime) >= new Date()
    );

    this.subscribedPastEvents = this.allEvents.filter(
      event =>
        this.user.events.subscribed.indexOf(event._id) !== -1 &&
        new Date(event.dateTime) <= new Date()
    );

    this.favoritedEvents = this.allEvents.filter(
      event => this.user.events.interested.indexOf(event._id) !== -1
    );

    this.createdEvents = this.allEvents.filter(
      event => this.user.events.created.indexOf(event._id) !== -1
    );
  }

  updateFilteredGamesData() {
    if (!this.user || !this.allGames) {
      return false;
    }

    this.favoritedGames = this.allGames.filter(
      event => this.user.games.favorited.indexOf(event._id) !== -1
    );
  }
}
