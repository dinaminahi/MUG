import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { UserItem } from "../components/user-profile/user";
import { DataService } from "../data.service";
import { AuthService } from "../shared/auth.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatConfirmDialogComponent } from "./../mat-confirm-dialog/mat-confirm-dialog.component";

@Component({
  selector: "app-button-join",
  templateUrl: "./button-join.component.html",
  styleUrls: ["./button-join.component.scss"],
})
export class ButtonJoinComponent implements OnInit, OnChanges {
  @Input() eventId: string;
  subscribedEvents: string[];
  isSubscribed: boolean;
  isLoading: boolean;
  isFull: boolean;
  user: UserItem;

  constructor(
    private _dataService: DataService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.getCurrentUserData().subscribe((user) => {
        if (!user) {
          return false;
        }
        this.user = user;
        if (this.eventId) {
          this.setIsSubscribed();
        }
      });
    }
  }

  setIsSubscribed() {
    this.isSubscribed = !!(
      this.user.events.subscribed.indexOf(this.eventId) > -1
    );
  }

  ngOnChanges() {
    if (this.eventId && this.user) {
      this.setIsSubscribed();
    }
  }

  toggleSubscribed() {
    if (this.authService.isLoggedIn) {
      this.isLoading = true;
      if (this.eventId) {
        this._dataService
          .joinToEvent(this.eventId, this.user._id, !this.isSubscribed)
          .subscribe((res) => {
            this.isLoading = false;
            this.isFull =
              res.event.players.count.current >= res.event.players.count.max;
            this.isSubscribed = !this.isSubscribed;
            this.subscribedEvents = res.user.events.subscribed;
          });
      }
    } else {
      this.openDialog();
    }
  }
  //--vyzov okna dialoga ---
  openDialog(): void {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: "390px",
      // height: "530px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
