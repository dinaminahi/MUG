import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./../shared/auth.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SigninComponent } from "./../components/signin/signin.component";

export interface DialogData {
  name: any;
  password: any;
  email: any;
}

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      // window.alert("Access not allowed!"); //---- change
      // this.router.navigate(["log-in"]); // ---- change

      const dialogRef = this.dialog.open(SigninComponent, {
        width: "450px",
        height: "640px",
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
    return true;
  }

  openDialog(): void {
    // this.dialog.open(SigninComponent);
  }
}
