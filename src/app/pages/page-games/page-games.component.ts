import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Game } from '../../game/game';
import { AuthService } from './../../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SigninComponent } from './../../components/signin/signin.component';

@Component({
  selector: 'app-page-games',
  templateUrl: './page-games.component.html',
  styleUrls: ['./page-games.component.scss']
})
export class PageGamesComponent {
  value;
  games: Game[];
  loading: boolean = true;
  searchText;
  displayMode: number;

  constructor(
    private _dataService: DataService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this._dataService.getGames().subscribe(res => {
      this.games = res;
      this.loading = false;
    });
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  goAddGame() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/addgame']);
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '767px',
      height: '530px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
