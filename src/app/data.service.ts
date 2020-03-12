import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: HttpClient) { }

  getEvents() {
    return this._http.get<any[]>("/api/events").pipe(
      map(result => this.result = JSON.parse(JSON.stringify(result)).data)
    );
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
