import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter",
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    return items.filter(
      (item) =>
        item.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1
    );
  }
}
