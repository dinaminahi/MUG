import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service"; //api
import { ApiService } from "./../../../app/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerData = {};

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {} //apiService

  post() {
    console.log(this.registerData);
    this.authService.registerUser(this.registerData);
  }

  ngOnInit(): void {}
}
