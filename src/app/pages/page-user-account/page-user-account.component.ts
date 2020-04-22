import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { User } from './../page-users/user';

@Component({
  selector: 'app-page-user-account',
  templateUrl: './page-user-account.component.html',
  styleUrls: ['./page-user-account.component.scss']
})
export class PageUserAccountComponent implements OnInit {
  public user: User;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    let id = this.authService.UserId;
    this.authService.getUserProfile(id).subscribe(res => {
      this.user = res.msg;
    });
  }
}
