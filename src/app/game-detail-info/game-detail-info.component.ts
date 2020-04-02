import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Game } from "../game/game";
import { Router } from "@angular/router";
// import { GameCategoryIconsComponent } from "../game-category-icons";
import { from } from "rxjs";

@Component({
  selector: "app-game-detail-info",
  templateUrl: "./game-detail-info.component.html",
  styleUrls: ["./game-detail-info.component.scss"]
})
export class GameDetailInfoComponent implements OnInit {
  games: Game[];
  public gameId: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.gameId = id;
    this.http
      .get("assets/game-object.json")
      .subscribe((data: Game[]) => (this.games = data));
  }
  gotoGames() {
    this.router.navigate(["/games"]);
  }
}
