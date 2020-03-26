import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CheckboxItem } from "./checkbox-item";

@Component({
  selector: "app-filter-category",
  templateUrl: "./filter-category.component.html",
  styleUrls: ["./filter-category.component.scss"]
})
export class FilterCategoryComponent implements OnInit {
  @Input() options = Array<CheckboxItem>();
  @Output() toggle = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    // this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(checkedOptions.map(x => x.value));
  }  
}
