import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EventItem } from "./event-item/event-item";

@Injectable()
export class DataService {
  result: any;
  events: EventItem[];

  constructor(private _http: HttpClient) {}

  getEvents() {
    return this._http.get("assets/events-extended.json");
    //  .subscribe((data: EventItem[]) => (this.events = data));

    //     return this._http.get<{status: number, data: [], message: string }>("/api/events").pipe(
    // //      map(result => this.result = JSON.parse(JSON.stringify(result)).data)
    //       map(result => this.result = result.data)
    //     );
  }
}

// import { Injectable } from '@angular/core';
//
// import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//
//   result:any;
//
//   constructor(private _http: Http) { }
//
//   getUsers() {
//     return this._http.get("/api/users")
//       .map(result => this.result = result.json().data);
//   }
//
// }
