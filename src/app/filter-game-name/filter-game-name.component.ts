import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CheckboxItem } from "./checkbox-item";

@Component({
  selector: "app-filter-game-name",
  templateUrl: "./filter-game-name.component.html",
  styleUrls: ["./filter-game-name.component.scss"],
})
export class FilterGameNameComponent {
  @Input() games: string[];
  checkboxes: CheckboxItem[];
  @Output() toggle = new EventEmitter<any>();

  ngOnChanges() {
    if (this.games) {
      this.checkboxes = this.games.map((gameName) => ({
        value: gameName,
        label: gameName,
        checked: false,
      }));
    }
  }

  onToggle() {
    const checkedOptions = this.checkboxes.filter((x) => x.checked);
    this.toggle.emit(checkedOptions.map((x) => x.value));
  }
}
