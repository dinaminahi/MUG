import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";

@Component({
  selector: "app-layout-header",
  templateUrl: "./layout-header.component.html",
  styleUrls: ["./layout-header.component.scss"],
})
export class LayoutHeaderComponent implements OnInit {
  constructor(public authService: AuthService) {} //private must

  ngOnInit(): void {}
}
