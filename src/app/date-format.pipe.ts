import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  transform(item: any[], startDate: string, endDate: string): any[] {
    let filteredArray = new Array();

    var datePipe = new DatePipe("en-US");
    startDate = datePipe.transform(startDate, "dd/MM/yyyy");
    endDate = datePipe.transform(endDate, "dd/MM/yyyy");

    if (item && item.length) {
      item.forEach((currentEvent) => {
        var eventStartDate = datePipe.transform(
          currentEvent.dateDebut,
          "dd/MM/yyyy"
        );
        var eventEndDate = datePipe.transform(
          currentEvent.dateFin,
          "dd/MM/yyyy"
        );
        if (eventStartDate >= startDate && eventEndDate <= endDate) {
          filteredArray.push(currentEvent);
        }
      });
    }
    return filteredArray;
  }
}
