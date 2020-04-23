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

  currentUser: Object = {};
  expectedUser: UserItem;
  expectedUserCity: String;

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this._dataService.getUserById(id).subscribe(res => {
        this.expectedUser = res[0];
        this.expectedUserCity = res[0].personal.location.address.substring(
          0,
          res[0].personal.location.address.indexOf(',')
        );
      });
    } else {
      this._dataService.getUserById(this.authService.UserId).subscribe(res => {
        this.expectedUser = res[0];
        this.expectedUserCity = res[0].personal.location.address.substring(
          0,
          res[0].personal.location.address.indexOf(',')
        );
      });
    }
  }

  goEdit() {
    this.router.navigate(['/user-edit', this.authService.UserId]);
  }
}
