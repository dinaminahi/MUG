import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventItem } from './../event-item/event-item';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { DataService } from './../data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogForCancelBtnComponent } from './../dialog-for-cancel-btn/dialog-for-cancel-btn.component';

@Component({
  selector: 'app-user-created-event-item',
  templateUrl: './user-created-event-item.component.html',
  styleUrls: ['./user-created-event-item.component.scss']
})
export class UserCreatedEventItemComponent implements OnInit {
  @Input() event: EventItem;
  cancel: boolean;

  currUserId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private _dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currUserId = this.authService.UserId;
    this.cancel = this.event.canceled;
  }

  onSelect(event) {
    this.router.navigate(['/events', event._id]);
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
    if (!this.cancel) {
      this._dataService.cancelEvent(eventId, userId).subscribe(res => {
        console.log('canceled');
        this.cancel = true;
      });
    }
  }
}
