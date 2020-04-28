import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import { Game } from "../game/game";
import { Router } from "@angular/router";
// import { GameCategoryIconsComponent } from "../game-category-icons";
import { from } from "rxjs";
import { EventItem } from "../event-item/event-item";

@Component({
  selector: "app-game-detail-info",
  templateUrl: "./game-detail-info.component.html",
  styleUrls: ["./game-detail-info.component.scss"],
})
export class GameDetailInfoComponent implements OnInit {
  game: Game;
  allEvents: EventItem[] = [];
  relatedEvents: EventItem[] = [];
  // gameFromJson: Game;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _dataService: DataService
  ) {}

  // temporary merge Game returned from API with the Game loaded from JSON
  // to get property with image gallery hardcoded in JSON
  // mergeGameObj() {
  //   this.game = {
  //     ...this.game,
  //     ...{
  //       photoUrl: this.gameFromJson.photoUrl // an Array
  //     }
  //   };
  // }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this._dataService.getGameById(id).subscribe((res) => {
      this.game = res[0];
      this.filterRelatedEvents();
    });
    this._dataService.getEvents().subscribe((res) => {
      this.allEvents = res;
      this.filterRelatedEvents();
    });
  }

  filterRelatedEvents() {
    if (!this.game || !this.allEvents) {
      return false;
    }
    this.relatedEvents = this.allEvents
      .filter(
        (event) =>
          event.agame[0]._id === this.game._id &&
          new Date(event.dateTime) >= new Date()
      )
      .slice(0, 6);
  }

  gotoGames() {
    this.router.navigate(["/games"]);
  }
}
