import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EventItem } from "./event-item/event-item";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  categories: string[];
  events: EventItem[];
  event: EventItem;
  constructor(private _http: HttpClient) {}

  public getEventById(id: number): Observable<EventItem> {
    return this._http
      .get<{ status: number; data: EventItem; message: string }>(
        `/api/events_extended/${id}`
      )
      .pipe(map(response => (this.event = response.data)));
  }

  public getEvents(): Observable<EventItem[]> {
    return this._http
      .get<{ status: number; data: EventItem[]; message: string }>(
        "/api/events_extended"
      )
      .pipe(map(response => (this.events = response.data)));
  }

  public getCategories(): Observable<string[]> {
    return this._http
      .get<{ status: number; data: {category: string[]}; message: string }>(
        "/api/categories"
      )
      .pipe(map(response => (this.categories = response.data.category)));
  }
}
