import { Component, Input } from "@angular/core";
import { User } from "../pages/page-users/user";
import { DataService } from "../data.service";
import mongoose from "mongoose";
import { AuthService } from "../shared/auth.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../components/signin/signin.component";

@Component({
  selector: "app-button-join",
  templateUrl: "./button-join.component.html",
  styleUrls: ["./button-join.component.scss"],
})
export class ButtonJoinComponent {
  @Input() eventId: mongoose.Types.ObjectId;
  subscribedEvents: string[];
  isSubscribed: boolean;
  isLoading: boolean;
  isFull: boolean;
  user: User;

  constructor(
    private _dataService: DataService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    if (this.authService.isLoggedIn) {
      let id = this.authService.UserId;
      this.authService.getUserProfile(id).subscribe((res) => {
        this.user = res.msg;
        if (!this.user) {
          return false;
        }
        if (this.eventId) {
          this.isSubscribed = !!(
            this.user.events.subscribed.indexOf(this.eventId) > -1
          );
        }
      });
    }
  }

  ngOnInit(): void {}

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

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "767px",
      height: "530px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
