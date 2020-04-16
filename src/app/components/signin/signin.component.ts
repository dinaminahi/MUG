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
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [""],
      password: [""],
    });
    this.signupForm = this.fb.group({
      name: [""],
      email: [""],
      mobile: [""],
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
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        console.log(res);
        this.signupForm.reset();
        this.router.navigate(["sign-in"]);
      }
    });
  }
}
