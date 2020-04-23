import { Component, Input } from '@angular/core';
import { Game } from '../game/game';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-favorites-games',
  templateUrl: './users-favorites-games.component.html',
  styleUrls: ['./users-favorites-games.component.scss']
})
export class UsersFavoritesGamesComponent {
  @Input() favoritedGames: string;
  games: Game[];

  constructor(private _dataService: DataService, private router: Router) {
    this._dataService.getGames().subscribe(res => {
      this.games = res.filter(
        game => this.favoritedGames.indexOf(game._id) !== -1
      );
    });
  }
}
