import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { Game } from "../../game/game";

@Component({
  selector: 'app-page-games',
  templateUrl: './page-games.component.html',
  styleUrls: ['./page-games.component.scss']
})
export class PageGamesComponent implements OnInit {
  games: Game[];
  constructor(private _dataService: DataService) {
    this._dataService.getGames().subscribe(res => (this.games = res));
  }

  ngOnInit(): void {
  }

}
