import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page-users",
  templateUrl: "./page-users.component.html",
  styleUrls: ["./page-users.component.scss"],
})
export class PageUsersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers();
  }
}
