import { Component, Input } from '@angular/core';
import { Game } from '../game/game';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-game-names',
  templateUrl: './fav-game-names.component.html',
  styleUrls: ['./fav-game-names.component.scss']
})
export class FavGameNamesComponent {
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
