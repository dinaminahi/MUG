import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit {
  constructor() {}

  cards = [
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    },
    {
      title: "EVENT NAME",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card content",
      buttonText: "Button",
      img:
        "https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
    }
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
  }
}
