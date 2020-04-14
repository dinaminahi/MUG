import { Component, Input } from "@angular/core";
import { User } from "../pages/page-users/user";
import { DataService } from "../data.service";
import mongoose from "mongoose";

@Component({
  selector: "app-button-join",
  templateUrl: "./button-join.component.html",
  styleUrls: ["./button-join.component.scss"],
})
export class ButtonJoinComponent {
  @Input() eventId: mongoose.Types.ObjectId;
  subscribedEvents: string[];
  isSubscribed: boolean;
  isLoading: boolean;
  user: User;

  constructor(private _dataService: DataService) {
    this._dataService.getUser().subscribe((res) => {
      this.user = res;
      if (!this.user) {
        return false;
      }
      if (this.eventId) {
        this.isSubscribed = !!(
          this.user.events.subscribed.indexOf(this.eventId) > -1
        );
      }
    });
  }

  ngOnInit(): void {}

  toggleSubscribed() {
    this.isLoading = true;

    if (this.eventId) {
      this._dataService
        .joinToEvent(this.eventId, this.user._id, !this.isSubscribed)
        .subscribe((res) => {
          this.isLoading = false;
          this.isSubscribed = !this.isSubscribed;
          this.subscribedEvents = res;
        });
    }
  }
}
