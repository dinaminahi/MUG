import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../components/signin/signin.component";

@Component({
  selector: "app-mat-confirm-dialog",
  templateUrl: "./mat-confirm-dialog.component.html",
  styleUrls: ["./mat-confirm-dialog.component.scss"],
})
export class MatConfirmDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "767px",
      height: "530px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
