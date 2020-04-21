import { Component } from "@angular/core";
import { DataService } from "../../data.service";
import { Game } from "../../game/game";

@Component({
  selector: "app-page-games",
  templateUrl: "./page-games.component.html",
  styleUrls: ["./page-games.component.scss"],
})
export class PageGamesComponent {
  value;
  games: Game[];
  loading: boolean = true;
  searchText;
  displayMode: number;

  constructor(private _dataService: DataService) {
    this._dataService.getGames().subscribe((res) => {
      this.games = res;
      this.loading = false;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
}
