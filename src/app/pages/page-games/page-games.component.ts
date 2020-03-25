import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data.service";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { Game } from "../../game/game";

@Component({
  selector: "app-page-games",
  templateUrl: "./page-games.component.html",
  styleUrls: ["./page-games.component.scss"]
})
export class PageGamesComponent implements OnInit {
  games: Game[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("assets/game-object.json").subscribe((data: Game[]) => {
      console.log({ data });
      this.games = data;
    });
  }
}
