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
import { SigninComponent } from "./../components/signin/signin.component";

@Component({
  selector: "app-button-join",
  templateUrl: "./button-join.component.html",
  styleUrls: ["./button-join.component.scss"],
})
export class ButtonJoinComponent implements OnInit, OnChanges {
  @Input() eventId: string;
  @Input() playersCount: any;
  @Input() canceled: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  isFull: boolean;
  currentUser: UserItem;

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
        this.currentUser = user;
        if (this.eventId) {
          this.setIsSubscribed();
        }
      });
    }
  }

  setIsSubscribed() {
    this.isSubscribed =
      this.currentUser &&
      this.eventId &&
      !!(this.currentUser.events.subscribed.indexOf(this.eventId) > -1);
  }

  setIsFull() {
    this.isFull =
      this.playersCount && this.playersCount.current >= this.playersCount.max;
  }

  ngOnChanges() {
    this.setIsSubscribed();
    this.setIsFull();
  }

  toggleSubscribed() {
    if (this.authService.isLoggedIn) {
      this.isLoading = true;
      if (this.eventId) {
        this._dataService
          .joinToEvent(this.eventId, this.currentUser._id, !this.isSubscribed)
          .subscribe(() => {
            this.isLoading = false;
          });
      }
    } else {
      this.openDialog();
    }
  }
  //--vyzov okna dialoga ---
  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "767px",
      height: "530px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
