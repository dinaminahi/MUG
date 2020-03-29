import { Component, OnInit, Input } from "@angular/core";
import { GameCategory } from "./game-category";
import { from } from "rxjs";

import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

@Component({
  selector: "app-game-category-icons",
  templateUrl: "./game-category-icons.component.html",
  styleUrls: ["./game-category-icons.component.scss"]
})
export class GameCategoryIconsComponent implements OnInit {
  @Input() categories: GameCategory[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.categories = [
    //   { name: "adventure", label: "Пригоди", iconClass: "fas fa-dice-five" },
    //   { name: "teens", label: "Для підлітків", iconClass: "fas fa-dragon" },
    //   { name: "geeks", label: "Гікам", iconClass: "fas fa-dungeon" },
    //   { name: "solo", label: "Соло", iconClass: "fas fa-balance-scale" }
    // ];
    // this.http
    //   .get("assets/categories-games.json")
    //   .subscribe((data: GameCategory[]) => {
    //     this.categories = data;
    //   });
  }
}
