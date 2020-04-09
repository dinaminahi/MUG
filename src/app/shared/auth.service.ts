import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // messages = [] //----- for messging
  path = "http://lockalhost:3000/auth";

  constructor(private http: HttpClient) {}

  registerUser(registerData) {
    this.http.post(this.path + "/signup", registerData).subscribe((res) => {});
  }

  loginUser(loginData) {
    this.http
      .post(this.path + "/signin", loginData) // need to check adress /api/signin
      .subscribe((res) => {
        localStorage.setItem("token", res.json().token); /// error
      });
  }
}
