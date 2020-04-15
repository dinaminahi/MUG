import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";
import { NgxPageScrollModule } from "ngx-page-scroll";

@Component({
  selector: "app-layout-footer",
  templateUrl: "./layout-footer.component.html",
  styleUrls: ["./layout-footer.component.scss"],
})
export class LayoutFooterComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private pageScroll: NgxPageScrollModule
  ) {}
  logIn() {
    this.router.navigate(["/sign-up"]);
  }

  backToTop() {
    // this.router.navigate(["/"]);
    this.pageScroll;
  }

  ngOnInit(): void {}
}
