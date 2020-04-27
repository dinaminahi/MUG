import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EventItem } from "./event-item/event-item";
import { Game } from "./game/game";
import { Observable, from } from "rxjs";
import { Comment } from "./comment-item/comment";
import { catchError, retry } from "rxjs/operators";
import { User } from "./pages/page-user-account/user";
import { UserItem } from "./components/user-profile/user";
import { GameCategory } from "./game-category-icons/game-category";
import { EmitterVisitorContext } from "@angular/compiler";
import { AuthService } from "./shared/auth.service";

@Injectable({ providedIn: "root" })
export class DataService {
  categories: GameCategory[];
  events: EventItem[];
  games: Game[];
  event: EventItem;
  game: Game;
  comments: Comment[];
  user: User;
  currentUser: UserItem;
  favoritedEvents: string[];
  favoritedGames: string[];
  favoritegameNames: string[];

  private eventsSource = new BehaviorSubject<EventItem[]>([]);
  eventsShared = this.eventsSource.asObservable();

  constructor(private _http: HttpClient, public authService: AuthService) {
    this.authService.getCurrentUserData().subscribe((user) => {
      this.currentUser = user;
    });
  }

  public getEventById(id: String): Observable<EventItem> {
    return this._http
      .get<{ status: number; data: EventItem; message: string }>(
        `/api/events_extended/${id}`
      )
      .pipe(map((response) => (this.event = response.data)));
  }

  public getUserById(id: String): Observable<UserItem> {
    return this._http
      .get<{ status: number; data: UserItem; message: string }>(
        `/api/userinfo/${id}`
      )
      .pipe(map((response) => (this.currentUser = response.data)));
  }

  public getEvents(): Observable<EventItem[]> {
    return this._http
      .get<{ status: number; data: EventItem[]; message: string }>(
        "/api/events_extended"
      )
      .pipe(
        map((response) => {
          const resSorted = response.data.sort(
            (a, b) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          );
          this.eventsSource.next(resSorted);
          return resSorted;
        })
      );
  }

  public getComments(id: String): Observable<Comment[]> {
    return this._http
      .get<{ status: number; data: Comment[]; message: string }>(
        `/api/comments/${id}`
      )
      .pipe(map((response) => (this.comments = response.data)));
  }

  addComment(newComment) {
    return this._http.post<any>("/api/addcomment", newComment).pipe(
      tap((newComment) =>
        console.log(`inserted = ${JSON.stringify(newComment)}`)
      ),
      catchError((error) => {
        return "error";
      })
    );
  }

  public getCategories(): Observable<GameCategory[]> {
    return this._http
      .get<{
        status: number;
        data: GameCategory[];
        message: string;
      }>("/api/categories")
      .pipe(map((response) => (this.categories = response.data)));
  }

  public getGames(): Observable<Game[]> {
    return this._http
      .get<{ status: number; data: Game[]; message: string }>("/api/games")
      .pipe(map((response) => (this.games = response.data)));
  }

  public getFavouriteGameNames(id: string): Observable<string[]> {
    return this._http
      .get<{ favouriteGameNames: string[] }>(`/api/favorited-game-names/`)
      .pipe(
        map(
          (response) => (this.favoritegameNames = response.favouriteGameNames)
        )
      );
  }

  addEvent(newEvent) {
    return this._http.post<any>(`/api/addevent`, newEvent).pipe(
      tap((newEvent) =>
        console.log(`added event = ${JSON.stringify(newEvent)}`)
      ),
      catchError((error) => {
        return error;
      }),
      map((response) => {
        this.currentUser.events.subscribed.push(response._id);
        this.currentUser.events.created.push(response._id);
        this.authService.updateCurrenUser(this.currentUser);
      })
    );
  }

  editUser(newUser, id: string) {
    return this._http.post<any>(`/api/edit-user/${id}`, newUser).pipe(
      tap((newUser) => console.log(`edited user = ${JSON.stringify(newUser)}`)),
      catchError((error) => {
        return "error";
      })
    );
  }

  addGame(newGame) {
    return this._http.post<any>(`/api/addgame`, newGame).pipe(
      tap((newGame) => console.log(`added game = ${JSON.stringify(newGame)}`)),
      catchError((error) => {
        return error;
      })
    );
  }

  cancelEvent(eventId: string, userId: string) {
    return this._http
      .post<any>(`/api/cancelevent`, { eventId, userId })
      .pipe(
        tap((newEvent) =>
          console.log(`canceled event = ${JSON.stringify(newEvent)}`)
        ),
        catchError((error) => {
          return error;
        })
      );
  }

  deleteNotification(notificationId: string, userId: string) {
    return this._http
      .put<any>(`/api/deletenotification`, { notificationId, userId })
      .pipe(
        tap((deletedNotif) =>
          console.log(`deleted notif = ${JSON.stringify(deletedNotif)}`)
        ),
        catchError((error) => {
          return error;
        })
      );
  }

  public getGameById(id: String): Observable<Game> {
    return this._http
      .get<{ status: number; data: Game; message: string }>(`/api/games/${id}`)
      .pipe(map((response) => (this.game = response.data)));
  }

  public getUser(): Observable<User> {
    return this._http
      .get<User>("assets/user-object.json")
      .pipe(map((response) => (this.user = response)));
  }

  public addGameToFavorites(
    gameId: number,
    userId: string,
    toggle: boolean
  ): Observable<[]> {
    return this._http
      .put<any>("/api/favorite-games", { gameId, userId, toggle })
      .pipe(
        map((response) => {
          this.currentUser.games.favorited = response;
          this.authService.updateCurrenUser(this.currentUser);
          return response;
        })
      );
  }

  public addEventToFavorites(
    eventId: number,
    userId: string,
    toggle: boolean
  ): Observable<[]> {
    return this._http
      .put<any>("/api/favorite-events", { eventId, userId, toggle })
      .pipe(
        map((response) => {
          this.currentUser.events.interested = response;
          this.authService.updateCurrenUser(this.currentUser);
          return response;
        })
      );
  }

  public joinToEvent(
    eventId: string,
    userId: string,
    toggle: boolean
  ): Observable<any> {
    return this._http
      .put<any>("/api/join-to-event", { eventId, userId, toggle })
      .pipe(
        map((response) => {
          const currentEvents = this.eventsSource.getValue();
          const currentEvent = currentEvents.find(
            (event) => event._id === eventId
          );
          currentEvent.players = response.event.players;
          this.eventsSource.next(currentEvents);
          this.currentUser.events.subscribed = response.user.events.subscribed;
          this.authService.updateCurrenUser(this.currentUser);
          return response;
        })
      );
  }
}
