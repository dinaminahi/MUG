import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";
import { NgxPageScrollModule } from "ngx-page-scroll";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../../components/signin/signin.component";

@Component({
  selector: "app-layout-footer",
  templateUrl: "./layout-footer.component.html",
  styleUrls: ["./layout-footer.component.scss"],
})
export class LayoutFooterComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private pageScroll: NgxPageScrollModule
  ) {}

  backToTop() {
    // this.router.navigate(["/"]);
    this.pageScroll;
  }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "767px",
      height: "auto",
      maxWidth: "100vw",
      disableClose: true,
      // data: {
      //   name: this.name,
      //   password: this.password,
      //   email: this.password,
      // },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // alert("Are You Shoore?");
      // this.name = result; -  could add to user name
    });
    // this.dialog.open(SigninComponent);
  }
}
