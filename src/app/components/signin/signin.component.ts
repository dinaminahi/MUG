import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  signupForm: FormGroup;

  get emailIn() {
    return this.signinForm.get('email');
  }

  get passwordIn() {
    return this.signinForm.get('password');
  }
  get nameUp() {
    return this.signupForm.get('name');
  }
  get emailUp() {
    return this.signupForm.get('email');
  }
  get passwordUp() {
    return this.signupForm.get('password');
  }

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onClickCheck(): void {}

  onNoClick(): void {
    this.router.navigate(['/home']);

    // this.dialogRef.close();
  }
  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');

    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    const signUpButtonSubmit = document.getElementById('submit-up');
    signUpButtonSubmit.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
    this.router.navigate(['events']);
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(res => {
      if (res.result) {
        console.log(res);
        this.signupForm.reset();
        this.router.navigate(['user-profile/' + res.msg._id]);
        // this.router.navigate(["sign-in"]);
      }
    });
  }
}
