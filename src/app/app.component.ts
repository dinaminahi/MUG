import { Component } from "@angular/core";
import { from } from "rxjs";

import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "MUG-project";
  // constructor(private dataService: DataService) {} // api.servise

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
