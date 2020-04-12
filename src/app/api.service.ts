import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { environment } from "../environments/environment";

@Injectable()
export class ApiService {
  messages = [];
  users = [];
  path = "http://localhost:3000"; // = environment.path;

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<any>(this.path + "/users").subscribe((res) => {
      this.users = res;
    });
  }

  getProfile(id) {
    return this.http.get(this.path + "/profile/" + id);
  }
}
