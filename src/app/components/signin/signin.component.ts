import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./../../shared/auth.service";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [""],
      password: [""],
    });
  }
  onNoClick(): void {
    this.router.navigate(["/home"]);

    // this.dialogRef.close();
  }
  ngOnInit() {}

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
