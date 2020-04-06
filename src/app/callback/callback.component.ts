import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../auth/auth.service";

@Component({
  selector: "app-callback",
  template: `
    <p>
      Loading...
    </p>
  `,
  styleUrls: ["./callback.component.scss"],
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.handleLoginCallback();
  }
}
