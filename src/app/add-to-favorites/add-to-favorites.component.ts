import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EventItem } from "../event-item/event-item";
import { Game } from "../game/game";
import { User } from "../pages/page-users/user";
import { from } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import { DataService } from "../data.service";

@Component({
  selector: "app-add-to-favorites",
  templateUrl: "./add-to-favorites.component.html",
  styleUrls: ["./add-to-favorites.component.scss"],
})
export class AddToFavoritesComponent implements OnInit {
  @Input() gameId: number;
  @Input() eventId: number;
  favoritedEvents: string[];
  favoritedGames: string[];
  isFavorited: boolean;
  isLoading: boolean;
  user: User;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  isAuthenticated = true;

  constructor(private _dataService: DataService, private http: HttpClient) {
    this._dataService.getUser().subscribe((res) => {
      this.user = res;
      const gameId = this.gameId;
      if (this.gameId) {
        this.isFavorited = !!this.user.games.favorited.indexOf(gameId);
      }
      if (this.eventId) {
        this.isFavorited = !!this.user.events.interested.indexOf(gameId);
      }
    });
  }

  ngOnInit(): void {}

  toggleFavorite() {
    this.isLoading = true;
    this._dataService
      .addGameToFavorites(
        this.gameId,
        this.user.personal.email,
        !this.isFavorited
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.isFavorited = !this.isFavorited;
        this.favoritedGames = res;
      });
  }
}
