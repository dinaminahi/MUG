import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Injectable()
// {
// providedIn: "root",
// }
export class AuthService {
  // messages = [] //----- for messging
  path = "http://lockalhost:3000/user"; // need to change /api/auth /or/ /user
  TOKEN_KEY = "token";

  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  //check if logedin---
  get isAutentikated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  //----
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  registerUser(registerData) {
    this.http
      .post<any>(this.path + "/register", registerData)
      .subscribe((res) => {
        this.saveToken(res.token);
      });
  }

  loginUser(loginData) {
    this.http
      .post<any>(this.path + "/login", loginData) // need to check adress /api/signin
      .subscribe((res) => {
        this.saveToken(res.token);
      });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
