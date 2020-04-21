import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ParticipantsCount } from "./participants-count";
import { AuthService } from "../shared/auth.service";
import mongoose from "mongoose";

@Component({
  selector: "app-participants-count",
  templateUrl: "./participants-count.component.html",
  styleUrls: ["./participants-count.component.scss"],
})
export class ParticipantsCountComponent {
  @Input() count: ParticipantsCount;
  @Input() joined: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {}

  onSelect(user) {
    this.router.navigate(["/user-profile", user._id]);
  }
}
