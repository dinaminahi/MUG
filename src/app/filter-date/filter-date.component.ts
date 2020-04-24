import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CheckboxItem } from "../filter-category/checkbox-item";

@Component({
  selector: "app-filter-date",
  templateUrl: "./filter-date.component.html",
  styleUrls: ["../filter-category/filter-category.component.scss"],
})
export class FilterDateComponent {
  @Input() datesFormatted: string[];
  checkboxes: CheckboxItem[];
  @Output() toggle = new EventEmitter<any>();

  ngOnChanges() {
    if (this.datesFormatted) {
      this.checkboxes = this.datesFormatted.map((dateString) => ({
        value: dateString,
        label: dateString,
        checked: false,
      }));
    }
  }

  onToggle() {
    const checkedOptions = this.checkboxes.filter((x) => x.checked);
    this.toggle.emit(checkedOptions.map((x) => x.value));
  }
}
