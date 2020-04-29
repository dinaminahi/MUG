import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventItem } from '../event-item/event-item';
import { Comment } from './../comment-item/comment';
import { DataService } from '../data.service';
import { AuthService } from './../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from './../components/signin/signin.component';

@Component({
  selector: 'app-event-detail-info',
  templateUrl: './event-detail-info.component.html',
  styleUrls: ['./event-detail-info.component.scss']
})
export class EventDetailInfoComponent implements OnInit {
  expectedEvent: EventItem;
  geo: Object;
  comments: Comment[];
  eventId: string;
  organizor: any;
  organisorCity: any;
  currUserId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.currUserId = this.authService.UserId;
    this.eventId = id;

    this._dataService.getEventById(id).subscribe(res => {
      this.expectedEvent = res[0];
      console.log(this.expectedEvent);
      this.geo = this.expectedEvent.location.geo;
      this.organizor = res[0].organizerInfo[0];
      this.organisorCity = res[0].organizerInfo[0].personal.location.address.substring(
        0,
        res[0].organizerInfo[0]?.personal.location.address.indexOf(',')
      );
    });

    this._dataService.getComments(id).subscribe(res => {
      this.comments = res;
    });
  }

  gotoEvents() {
    this.router.navigate(['/events']);
  }

  redirectToUserPage(organizor) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/useraccount', organizor._id]);
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '767px',
      height: '530px'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
