import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import { Game } from "../game/game";
import { Router } from "@angular/router";
// import { GameCategoryIconsComponent } from "../game-category-icons";
import { from } from "rxjs";

@Component({
  selector: "app-game-detail-info",
  templateUrl: "./game-detail-info.component.html",
  styleUrls: ["./game-detail-info.component.scss"],
})
export class GameDetailInfoComponent implements OnInit {
  game: Game;
  gameFromJson: Game;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _dataService: DataService
  ) {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this._dataService.getGameById(id).subscribe((res) => {
      this.game = res[0];

      if (this.gameFromJson) {
        this.mergeGameObj();
      }
    });
  }

  // temporary merge Game returned from API with the Game loaded from JSON
  // to get property with image gallery hardcoded in JSON
  mergeGameObj() {
    this.game = {
      ...this.game,
      ...{
        photoUrl: this.gameFromJson.photoUrl, // an Array
        category: this.gameFromJson.category, // an Array
      },
    };
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.http.get("assets/game-object.json").subscribe((data: Game[]) => {
      this.gameFromJson = data.find((game) => game.id === id);
      if (this.game) {
        this.mergeGameObj();
      }
    });
  }

  gotoGames() {
    this.router.navigate(["/games"]);
  }
}
