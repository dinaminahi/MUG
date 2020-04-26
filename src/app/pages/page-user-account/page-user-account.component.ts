import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./../../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserItem } from "src/app/components/user-profile/user";
import { DataService } from "../../data.service";
import { EventItem } from "../../event-item/event-item";
import { Game } from "src/app/game/game";

@Component({
  selector: "app-page-user-account",
  templateUrl: "./page-user-account.component.html",
  styleUrls: ["./page-user-account.component.scss"],
})
export class PageUserAccountComponent implements OnInit {
  public user: UserItem;

  joined: boolean = true;
  created: boolean = false;
  favouriteEvents: boolean = false;
  favouriteGames: boolean = false;
  events: EventItem[] = [];

  allEvents: EventItem[] = [];
  allGames: Game[] = [];

  subscribedEvents: EventItem[] = [];
  favoritedEvents: EventItem[] = [];
  joinedEvents: EventItem[] = [];
  createdEvents: EventItem[] = [];
  favoritedGames: Game[] = [];

  constructor(
    public authService: AuthService,
    private actRout: ActivatedRoute,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    let id = this.actRout.snapshot.paramMap.get("id");

    if (id === this.authService.UserId) {
      this.authService.getCurrentUserData().subscribe((user) => {
        this.user = user;
        this.updateFilteredEventsData();
        this.updateFilteredGamesData();
      });
    } else {
      this.authService.getUserProfile(id).subscribe((res) => {
        this.user = res.msg;
        this.updateFilteredEventsData();
        this.updateFilteredGamesData();
      });
    }

    this._dataService.getEvents().subscribe((res) => {
      this.allEvents = res;
      this.updateFilteredEventsData();
    });

    this._dataService.getGames().subscribe((res) => {
      this.allGames = res;
      this.updateFilteredGamesData();
    });
  }

  joinedClick() {
    this.joined = true;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = false;
  }

  createdClick() {
    this.joined = false;
    this.created = true;
    this.favouriteEvents = false;
    this.favouriteGames = false;
  }

  favouriteEventsClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = true;
    this.favouriteGames = false;
  }

  favouriteGamesClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = true;
  }

  updateFilteredEventsData() {
    if (!this.user || !this.allEvents) {
      return false;
    }

    this.subscribedEvents = this.allEvents.filter(
      (event) => this.user.events.subscribed.indexOf(event._id) !== -1
    );

    this.favoritedEvents = this.allEvents.filter(
      (event) => this.user.events.interested.indexOf(event._id) !== -1
    );

    this.joinedEvents = this.allEvents.filter(
      (event) => this.user.events.subscribed.indexOf(event._id) !== -1
    );

    this.createdEvents = this.allEvents.filter(
      (event) => this.user.events.created.indexOf(event._id) !== -1
    );
  }

  updateFilteredGamesData() {
    if (!this.user || !this.allGames) {
      return false;
    }

    this.favoritedGames = this.allGames.filter(
      (event) => this.user.games.favorited.indexOf(event._id) !== -1
    );
  }
}
