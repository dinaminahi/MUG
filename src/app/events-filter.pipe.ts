import { PipeTransform, Pipe } from "@angular/core";
import { EventItem } from "./event-item/event-item";

@Pipe({
  name: "eventsFilter",
})
export class EventsFilterPipe implements PipeTransform {
  transform(events: EventItem[], categories: string[]): EventItem[] {
    if (!events || !categories.length) {
      return events;
    }
    return events.filter(
      (event) =>
        event.agame[0].category.filter((category) =>
          categories.includes(category)
        ).length
    );
  }
}
