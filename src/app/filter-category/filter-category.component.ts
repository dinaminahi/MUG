import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { CheckboxItem } from "../filter-checkbox/checkbox-item";
import { GameCategory } from "../game-category-icons/game-category";

@Component({
  selector: "app-filter-category",
  templateUrl: "./filter-category.component.html",
  styleUrls: ["./filter-category.component.scss"],
})
export class FilterCategoryComponent implements OnInit, OnChanges {
  @Input() categories = Array<GameCategory>();
  checkboxes: CheckboxItem[];
  @Output() toggle = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.categories) {
      this.checkboxes = this.categories.map((category) => ({
        value: category.name,
        label: category.label,
        checked: false,
      }));
    }
  }

  onToggle() {
    const checkedOptions = this.checkboxes.filter((x) => x.checked);
    this.toggle.emit(checkedOptions.map((x) => x.value));
  }
}
