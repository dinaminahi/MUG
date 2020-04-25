import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../data.service';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: any;
  constructor(
    private _dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  delNotification(notificationId) {
    this._dataService
      .deleteNotification(notificationId, this.authService.UserId)
      .subscribe(res => {
        const i = this.notifications.findIndex(
          notif => notif._id === notificationId
        );
        if (i !== 1) {
          this.notifications.splice(i, 1);
        }
      });
  }
}
