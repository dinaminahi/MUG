import {
  Component,
  OnInit,
  Input,
  OnChanges,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() events: [];
  constructor() {}
  slides1: any = [[]];
  slides2: any = [[]];
  slides3: any = [[]];
  carouselDisplayMode: number;
  TABLET_BREAKPOINT: number = 768;
  DESKTOP_BREAKPOINT: number = 1024;
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  switchLayout() {
    if (window.innerWidth < this.TABLET_BREAKPOINT) {
      this.carouselDisplayMode = 1;
    } else if (
      this.TABLET_BREAKPOINT < window.innerWidth &&
      window.innerWidth < this.DESKTOP_BREAKPOINT
    ) {
      this.carouselDisplayMode = 2;
    } else {
      this.carouselDisplayMode = 3;
    }
    console.log(
      this.carouselDisplayMode,
      window.innerWidth,
      this.TABLET_BREAKPOINT,
      this.DESKTOP_BREAKPOINT
    );
  }
  ngOnChanges() {
    if (this.events) {
      this.slides1 = this.events;
      this.slides2 = this.chunk(this.events, 2);
      this.slides3 = this.chunk(this.events, 3);
      this.switchLayout();
    }
  }
  @HostListener("window:resize")
  onWindowResize() {
    if (this.events) {
      this.switchLayout();
    }
  }

  ngOnInit(): void {}
}
