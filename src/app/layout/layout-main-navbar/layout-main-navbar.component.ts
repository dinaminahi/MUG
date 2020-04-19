import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";
import { NgxPageScrollModule } from "ngx-page-scroll";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../../components/signin/signin.component";

export interface DialogData {
  name: any;
  password: any;
  email: any;
}

@Component({
  selector: "app-layout-main-navbar",
  templateUrl: "./layout-main-navbar.component.html",
  styleUrls: ["./layout-main-navbar.component.scss"],
})
export class LayoutMainNavbarComponent implements OnInit {
  // name: any;
  // password: any;
  // email: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private pageScroll: NgxPageScrollModule,
    public dialog: MatDialog
  ) {}
  

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "450px",
      // disableClose: true,
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

  logout() {
    this.authService.doLogout();
    this.router.navigate(["/home"]);
  }
  Scrolldown() {
    this.pageScroll;
  }
  ngOnInit(): void {}
}
