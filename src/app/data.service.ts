import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataService {

  result: any;
  constructor(private _http: HttpClient) { }

  public getEvents() {
    return [{
      "id": 1,
      "gameId": 4,
      "eventName": "UNO game",
      "description": "Шукаю хорошу компанію на суботу вечір на 'Уно', збираємось в мене вдома. З мене піца, з вас - пиво",
      "location": "55 North Oxford Court Rolling Meadows, IL",
      "dateTime": "06/08/2020",
      "duration": "2-3hr", 
      "players": {
          "age": {
              "min": 25,
              "max": 35
          },
          "count": {
              "min": 3,
              "max": 5,
              "current": 3
          },
          "invitationList": [
              23,
              45,
              56
          ], 
          "experienceNeeded": true,
      }
  },
  {
      "id": 2,
      "gameId": 3,
      "eventName": "KTULHU game",
      "description": "Двоє студентів шукають ще +- 3 любителів теми 'Ктулху' щоб пограти в неділю вдень настолку в кафе 'Дзига'",
      "location": "26 Rockwell Avenue Linden, NJ",
      "dateTime": "09/04/2020",
      "duration": "до закриття кафе", 
      "players": {
          "age": {
              "min": 20,
              "max": 25
          },
          "count": {
              "min": 2,
              "max": 4,
              "current": 1
          },
          "invitationList": [], 
          " experienceNeeded": true,
      }
  },
  {
      "id": 3,
      "gameId": 2,
      "eventName": "Some game",
      "description": "Молода сімя, любителі настолок. Шукаємо подібну пару для спільного проведення вечора за грою. Можна прийти з дітьми, їх буде чим зайняти :)",
      "location": "491 Del Monte Lane Dyersburg, TN",
      "dateTime": "05/05/2020",
      "duration": "до 22:00", 
      "players": {
          "age": {
              "min": 30,
              "max": 35
          },
          "count": {
              "min": 2,
              "max": 2,
              "current": 0
          },
          "invitationList": [
              40,
              58
          ], 
          "experienceNeeded": false,
      }
  }
  ];


    // this._http.get<any[]>("/api/events").pipe(
    //   map(result => this.result = JSON.parse(JSON.stringify(result)).data)
    // );
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
