import { Component } from "@angular/core";
import { AuthService } from "./../../shared/auth.service";
import { User } from "./user";

@Component({
  selector: "app-page-users",
  templateUrl: "./page-users.component.html",
  styleUrls: ["./page-users.component.scss"],
})
export class PageUsersComponent {
  public user: User;

  constructor(public authService: AuthService) {
    let id = this.authService.UserId;
    this.authService.getUserProfile(id).subscribe((res) => {
      this.user = res.msg;
    });
  }
}
