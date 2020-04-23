import { PipeTransform, Pipe } from "@angular/core";
import { EventItem } from "./event-item/event-item";

@Pipe({
  name: "eventsFilter",
})
export class EventsFilterPipe implements PipeTransform {
  transform(
    events: EventItem[],
    categories: string[],
    dates: string[],
    gameNames: string[]
  ): EventItem[] {
    if (!events || !(categories.length || dates.length || gameNames.length)) {
      return events;
    }

    return events.filter((event) => {
      let categoryFilterPass = true;
      if (categories.length) {
        categoryFilterPass = event.agame[0].category.filter((category) =>
          categories.includes(category)
        ).length;
      }

      let dateFilterPass = true;
      if (dates.length) {
        dateFilterPass = dates.includes(event.dateTime);
      }

      let gameNameFilterPass = true;
      if (gameNames.length) {
        gameNameFilterPass = gameNames.includes(event.agame[0].name);
      }

      return categoryFilterPass && dateFilterPass && gameNameFilterPass;
    });
  }
}
