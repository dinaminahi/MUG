import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";
import { NgxPageScrollModule } from "ngx-page-scroll";

@Component({
  selector: "app-layout-main-navbar",
  templateUrl: "./layout-main-navbar.component.html",
  styleUrls: ["./layout-main-navbar.component.scss"],
})
export class LayoutMainNavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private pageScroll: NgxPageScrollModule
  ) {}

  logout() {
    this.authService.doLogout();
    this.router.navigate(["/home"]);
  }
  Scrolldown() {
    this.pageScroll;
  }
  ngOnInit(): void {}
}
