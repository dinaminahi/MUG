import { Component, Input } from "@angular/core";
import { UserItem } from "../components/user-profile/user";
import { DataService } from "../data.service";
import { AuthService } from "../shared/auth.service";
import mongoose from "mongoose";

@Component({
  selector: "app-add-to-favorites",
  templateUrl: "./add-to-favorites.component.html",
  styleUrls: ["./add-to-favorites.component.scss"],
})
export class AddToFavoritesComponent {
  @Input() gameId: mongoose.Types.ObjectId;
  @Input() eventId: mongoose.Types.ObjectId;
  favoritedEvents: string[];
  favoritedGames: string[];
  isFavorited: boolean;
  isLoading: boolean;
  user: UserItem;

  constructor(
    private _dataService: DataService,
    public authService: AuthService
  ) {
    if (this.authService.isLoggedIn) {
      this.authService.getCurrentUserData().subscribe((user) => {
        this.user = user;
        if (!this.user) {
          return false;
        }
        if (this.gameId) {
          this.isFavorited = !!(
            this.user.games.favorited.indexOf(this.gameId) > -1
          );
        }
        if (this.eventId) {
          this.isFavorited = !!(
            this.user.events.interested.indexOf(this.eventId) > -1
          );
        }
      });
    }
  }

  ngOnInit(): void {}

  toggleFavorite() {
    this.isLoading = true;
    if (this.gameId) {
      this._dataService
        .addGameToFavorites(this.gameId, this.user._id, !this.isFavorited)
        .subscribe((res) => {
          this.isLoading = false;
          this.isFavorited = !this.isFavorited;
          this.favoritedGames = res;
        });
    }
    if (this.eventId) {
      this._dataService
        .addEventToFavorites(this.eventId, this.user._id, !this.isFavorited)
        .subscribe((res) => {
          this.isLoading = false;
          this.isFavorited = !this.isFavorited;
          this.favoritedEvents = res;
        });
    }
  }
}
