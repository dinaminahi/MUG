import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../auth.service"; //api
// import { ApiService } from "./../../../app/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerData = {};

  constructor(
    // private apiService: ApiService,
    private authService: AuthService
  ) {}

  post() {
    console.log(this.registerData);
    this.authService.registerUser(this.registerData);
  }

  ngOnInit(): void {}
}
