import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-user-account",
  templateUrl: "./page-user-account.component.html",
  styleUrls: ["./page-user-account.component.scss"],
})
export class PageUserAccountComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}
}
