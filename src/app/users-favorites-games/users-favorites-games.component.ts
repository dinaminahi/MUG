import { Component, Input } from "@angular/core";
import { Game } from "../game/game";

@Component({
  selector: "app-users-favorites-games",
  templateUrl: "./users-favorites-games.component.html",
  styleUrls: ["./users-favorites-games.component.scss"],
})
export class UsersFavoritesGamesComponent {
  @Input() favoritedGames: Game[];

  constructor() {}
}
