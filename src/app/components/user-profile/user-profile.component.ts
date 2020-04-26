import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { DataService } from './../../data.service';
import { UserItem } from './user';
import { EventItem } from 'src/app/event-item/event-item';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() expectedUser: UserItem;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  expectedUserCity: String;
  userId: string;
  currUserId: string;

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.paramMap.get('id');
    this.currUserId = this.authService.UserId;
    this.expectedUserCity = this.expectedUser.personal.location.address.substring(
      0,
      this.expectedUser.personal.location.address.indexOf(',')
    );

    // this.authService.getUserProfile(this.userId).subscribe(res => {
    //   this.expectedUser = res.msg;
    //   console.log(this.expectedUser);
    //   this.expectedUserCity = res.msg.personal.location.address.substring(
    //     0,
    //     res.msg.personal.location.address.indexOf(',')
    //   );
    // });
  }

  goEdit() {
    this.router.navigate(['/user-edit', this.authService.UserId]);
  }
}
