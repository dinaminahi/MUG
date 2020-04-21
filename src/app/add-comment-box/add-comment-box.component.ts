import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { DataService } from "./../data.service";
import { AuthService } from "./../shared/auth.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../components/signin/signin.component";

@Component({
  selector: "app-add-comment-box",
  templateUrl: "./add-comment-box.component.html",
  styleUrls: ["./add-comment-box.component.scss"],
})
export class AddCommentBoxComponent implements OnInit {
  @Input() eventId: string;
  commentForm: FormGroup;
  loading: Boolean;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let userId = this.authService.UserId;
    let name = this.authService.UserName;
    let photo = this.authService.UserPhoto;

    this.commentForm = this.fb.group({
      text: "",
      date: new Date().toLocaleString(),
      userId: userId,
      user: this.fb.group({
        personal: this.fb.group({
          name: name,
          photoUrl: photo,
        }),
      }),
      eventId: this.eventId,
    });
  }

  onSubmit() {
    if (this.authService.isLoggedIn) {
      this.loading = true;
      this._dataService.addComment(this.commentForm.value).subscribe((res) => {
        console.log(res);
        this.loading = false;
        this._dataService.comments.push(this.commentForm.value);
        this.commentForm.controls["text"].reset();
      });
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: "450px",
      height: "640px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
