import { Component } from "@angular/core";
import { DataService } from "../../data.service";
import { Game } from "../../game/game";

@Component({
  selector: "app-page-games",
  templateUrl: "./page-games.component.html",
  styleUrls: ["./page-games.component.scss"],
})
export class PageGamesComponent {
  games: Game[];

  constructor(private _dataService: DataService) {
    this._dataService.getGames().subscribe((res) => (this.games = res));
  }
}
