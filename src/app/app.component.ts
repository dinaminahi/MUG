import { Component } from "@angular/core";
import { from } from "rxjs";
// import { AuthService } from "./shared/auth.service";
// import { ApiService } from "./api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "MUG-project";
  constructor() // private apiService: ApiService,
  // private authService: AuthService
  {}

  ngOnInit() {
    // this.dataService.get();
    //
    // dont know if right-----
    // this.dataService.getEvents();
    // this.dataService.getCategories();
    // this.dataService.getGames();
    // this.dataService.getEventById;
    // this.dataService.getGameById;
    //---------------
  }
}
