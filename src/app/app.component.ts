import { Component } from "@angular/core";
import { from } from "rxjs";
import { AuthService } from "./shared/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "MUG-project";

  //logout example
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.doLogout();
  }
}
