import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // messages = [] //----- for messging
  path = "http://lockalhost:3000/auth";
  TOKEN_KEY = "token";

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAutentikated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  registerUser(registerData) {
    this.http.post(this.path + "/signup", registerData).subscribe((res) => {});
  }

  loginUser(loginData) {
    this.http
      .post<any>(this.path + "/signin", loginData) // need to check adress /api/signin
      .subscribe((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
      });
  }
}
