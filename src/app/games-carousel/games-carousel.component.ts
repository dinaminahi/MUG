import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-games-carousel",
  templateUrl: "./games-carousel.component.html",
  styleUrls: ["./games-carousel.component.scss"]
})
export class GamesCarouselComponent implements OnInit {
  @Input() imgs: string[];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
