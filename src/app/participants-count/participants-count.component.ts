import { Component, Input } from "@angular/core";
import { ParticipantsCount } from "./participants-count";

@Component({
  selector: "app-participants-count",
  templateUrl: "./participants-count.component.html",
  styleUrls: ["./participants-count.component.scss"]
})
export class ParticipantsCountComponent {
  @Input() count: ParticipantsCount;
}
