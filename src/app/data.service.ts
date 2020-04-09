import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EventItem } from "./event-item/event-item";
import { Game } from "./game/game";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  categories: string[];
  events: EventItem[];
  games: Game[];
  event: EventItem;
  game: Game;
  constructor(private _http: HttpClient) {}

  public getEventById(id: String): Observable<EventItem> {
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
      .get<{ status: number; data: { category: string[] }; message: string }>(
        "/api/categories"
      )
      .pipe(map(response => (this.categories = response.data.category)));
  }

  public getGames(): Observable<Game[]> {
    return this._http
      .get<{ status: number; data: Game[]; message: string }>("/api/games")
      .pipe(map(response => (this.games = response.data)));
  }

  public addEvent(newEvent) {
     return this._http.post('/api/addevent', newEvent).subscribe(data => {
      console.log(data);
    });
  }
  
  public getGameById(id: number): Observable<Game> {
    return this._http
      .get<{ status: number; data: Game; message: string }>(`/api/games/${id}`)
      .pipe(map(response => (this.game = response.data)));
  }
}
