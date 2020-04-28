import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { CheckboxItem } from "./checkbox-item";

@Component({
  selector: "app-filter-checkbox",
  templateUrl: "./filter-checkbox.component.html",
  styleUrls: ["../filter-category/filter-category.component.scss"],
})
export class FilterCheckboxComponent implements OnInit, OnChanges {
  @Input() label: string;
  checkbox: CheckboxItem;
  @Output() toggle = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.label) {
      this.checkbox = {
        value: this.label,
        label: this.label,
        checked: false,
      };
    }
  }

  onToggle() {
    this.toggle.emit(this.checkbox.checked);
  }
}
