import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  Inject,
} from "@angular/core";

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
  selector: "app-layout-nav",
  templateUrl: "./layout-nav.component.html",
  styleUrls: ["./layout-nav.component.scss"],
})
export class LayoutNavComponent implements OnInit {
  isFixedNavbar;
  @HostBinding("class.navbar-opened") navbarOpened = false;

  constructor() {
    public authService: AuthService,
    private router: Router,
    private pageScroll: NgxPageScrollModule,
    public dialog: MatDialog
  }

  ngOnInit(): void {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
}
