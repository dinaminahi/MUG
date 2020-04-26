import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventItem } from './event-item';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DataService } from './../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogForCancelBtnComponent } from './../dialog-for-cancel-btn/dialog-for-cancel-btn.component';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit, OnChanges {
  @Input() event: EventItem;
  currUserId: string;
  cancel: boolean;
  constructor(
    public authService: AuthService,
    private router: Router,
    private _dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currUserId = this.authService.UserId;
    this.cancel = this.event.canceled;
  }

  ngOnChanges() {}

  onSelect(event) {
    this.router.navigate(['/events', event._id]);
  }

  redirectToUserPage(user) {
    this.router.navigate(['/useraccount', user._id]);
  }

  openDialog(eventId) {
    let dialogRef = this.dialog.open(DialogForCancelBtnComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.cancelEvent(eventId, this.authService.UserId);
      }
    });
  }

  cancelEvent(eventId: string, userId: string) {
    console.log(this.event.canceled);
    if (!this.cancel) {
      this._dataService.cancelEvent(eventId, userId).subscribe(res => {
        console.log('canceled');
        this.cancel = true;
      });
    }
  }
}
