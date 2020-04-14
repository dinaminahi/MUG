import { Component, Input } from "@angular/core";
import { User } from "../pages/page-users/user";
import { DataService } from "../data.service";

@Component({
  selector: "app-add-to-favorites",
  templateUrl: "./add-to-favorites.component.html",
  styleUrls: ["./add-to-favorites.component.scss"],
})
export class AddToFavoritesComponent {
  @Input() gameId: number;
  @Input() eventId: number;
  favoritedEvents: string[];
  favoritedGames: string[];
  isFavorited: boolean;
  isLoading: boolean;
  user: User;

  constructor(private _dataService: DataService) {
    this._dataService.getUser().subscribe((res) => {
      this.user = res;
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

  ngOnInit(): void {}

  toggleFavorite() {
    this.isLoading = true;
    if (this.gameId) {
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
    if (this.eventId) {
      this._dataService
        .addEventToFavorites(
          this.eventId,
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
}
