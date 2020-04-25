import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Game } from "../game/game";
import { DataService } from "../data.service";

@Component({
  selector: "app-users-favorites-games",
  templateUrl: "./users-favorites-games.component.html",
  styleUrls: ["./users-favorites-games.component.scss"],
})
export class UsersFavoritesGamesComponent implements OnInit, OnChanges {
  @Input() favoritedGames: string;
  games: Game[];
  allGames: Game[];

  constructor(private _dataService: DataService) {}
  ngOnInit(): void {
    this._dataService.getGames().subscribe((res) => {
      this.allGames = res;
      this.updateFavoritedGamesData();
    });
  }

  updateFavoritedGamesData() {
    if (!this.favoritedGames || !this.allGames) {
      return false;
    }

    this.games = this.allGames.filter(
      (game) => this.favoritedGames.indexOf(game._id) !== -1
    );
  }

  ngOnChanges() {
    this.updateFavoritedGamesData();
  }
}
