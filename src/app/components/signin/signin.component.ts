import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent {
  loginData = {};

  constructor(private authService: AuthService) {}

  post() {
    this.authService.loginUser(this.loginData);
  }
}
