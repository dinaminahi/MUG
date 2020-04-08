import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerData: any = {};

  constructor(private authService: AuthService) {}

  post() {
    console.log(this.registerData);
    this.authService.registerUser(this.registerData);
  }

  ngOnInit(): void {}
}
