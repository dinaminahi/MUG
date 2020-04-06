import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: "app-layout-header",
  templateUrl: "./layout-header.component.html",
  styleUrls: ["./layout-header.component.scss"],
})
export class LayoutHeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
