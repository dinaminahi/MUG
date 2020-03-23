import { Component, OnInit, Input } from "@angular/core";
import { Url } from "url";
// import { Router } from "@angular/router";
import { from } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Game } from "./game";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @Input() game: Game;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("assets/game-object.json")
      .subscribe((data: Game) => (this.game = data));
  }
}
