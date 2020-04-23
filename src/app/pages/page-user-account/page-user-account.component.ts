import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../page-users/user';

@Component({
  selector: 'app-page-user-account',
  templateUrl: './page-user-account.component.html',
  styleUrls: ['./page-user-account.component.scss']
})
export class PageUserAccountComponent implements OnInit {
  public user: User;

  joined: boolean = true;
  created: boolean = false;
  favouriteEvents: boolean = false;
  favouriteGames: boolean = false;

  constructor(
    public authService: AuthService,
    private actRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.actRout.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.user = res.msg;
    });
  }

  joinedClick() {
    this.joined = true;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = false;
  }

  createdClick() {
    this.joined = false;
    this.created = true;
    this.favouriteEvents = false;
    this.favouriteGames = false;
  }

  favouriteEventsClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = true;
    this.favouriteGames = false;
  }

  favouriteGamesClick() {
    this.joined = false;
    this.created = false;
    this.favouriteEvents = false;
    this.favouriteGames = true;
  }
}
