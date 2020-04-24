import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() notifications: any;
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}

  delNotification(notificationId) {
    this._dataService.deleteNotification(notificationId).subscribe(res => {
      console.log('deleted!');
    });
  }
}
