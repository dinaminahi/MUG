import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  loginData: any = {};

  constructor(private authService: AuthService) {}

  post() {
    this.authService.loginUser(this.loginData);
  }

  ngOnInit(): void {}
}
