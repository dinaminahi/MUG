import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { DataService } from './../../data.service';
import { UserItem } from './user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;

  expectedUser: UserItem;
  expectedUserCity: String;
  userId: string;
  currUserId: string;

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.paramMap.get('id');
    this.currUserId = this.authService.UserId;
    if (this.userId) {
      this.authService.getUserProfile(this.userId).subscribe(res => {
        this.expectedUser = res.msg;
        this.expectedUserCity = res.msg.personal.location.address.substring(
          0,
          res[0].personal.location.address.indexOf(',')
        );
      });
    } else {
      this.userId = this.authService.UserId;
      this.authService.getUserProfile(this.userId).subscribe(res => {
        this.expectedUser = res.msg;
        this.expectedUserCity = res.msg.personal.location.address.substring(
          0,
          res.msg.personal.location.address.indexOf(',')
        );
      });
    }
  }

  goEdit() {
    this.router.navigate(['/user-edit', this.authService.UserId]);
  }
}
