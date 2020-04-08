import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(registerData) {
    this.http
      .post("http://localhost:3000/signup", registerData) // need to check adress or  "/api/user"
      .subscribe((res) => {});
  }

  loginUser(loginData) {
    this.http
      .post("http://localhost:3000/signin", loginData) // need to check adress
      .subscribe((res) => {
        localStorage.setItem("token", res.json().token);
      });
  }
}
