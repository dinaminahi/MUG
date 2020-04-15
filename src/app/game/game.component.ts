import { Component, Input } from "@angular/core";
import { Url } from "url";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Game } from "./game";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent {
  @Input() game: Game;

  constructor(private http: HttpClient, private router: Router) {}

  onSelect(game) {
    this.router.navigate(["/games", game._id]);
  }
}
