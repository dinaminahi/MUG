import { Component, OnInit } from "@angular/core";
import { NgxPageScrollModule } from "ngx-page-scroll";

@Component({
  selector: "app-layout-hero",
  templateUrl: "./layout-hero.component.html",
  styleUrls: ["./layout-hero.component.scss"],
})
export class LayoutHeroComponent implements OnInit {
  constructor(private pageScroll: NgxPageScrollModule) {}

  Scrolldown() {
    // this.router.navigate(["/"]);
    this.pageScroll;
  }

  ngOnInit(): void {}
}
