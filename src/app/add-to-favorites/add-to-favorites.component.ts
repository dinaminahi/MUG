import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EventItem } from "../event-item/event-item";
import { Game } from "../game/game";
import { User } from "../pages/page-users/user";
import { from } from "rxjs";
import { concatMap , tap} from 'rxjs/operators';
import { DataService } from "../data.service";


@Component({
  selector: "app-add-to-favorites",
  templateUrl: "./add-to-favorites.component.html",
  styleUrls: ["./add-to-favorites.component.scss"],
})
export class AddToFavoritesComponent implements OnInit {

  @Input() game: Game;
  @Input() event: EventItem;
  @Input() user: User;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  isAuthenticated = true;
  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.isSubmitting = true;
    this.user.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

}

// Просто як приклад як можна робити:

// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Router } from '@angular/router';

// import { Article, ArticlesService, UserService } from '../../core';
// import { of } from 'rxjs';
// import { concatMap ,  tap } from 'rxjs/operators';

// @Component({
//   selector: 'app-favorite-button',
//   templateUrl: './favorite-button.component.html'
// })
// export class FavoriteButtonComponent {
//   constructor(
//     private articlesService: ArticlesService,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   @Input() article: Article;
//   @Output() toggle = new EventEmitter<boolean>();
//   isSubmitting = false;

//   toggleFavorite() {
//     this.isSubmitting = true;

//     this.userService.isAuthenticated.pipe(concatMap(
//       (authenticated) => {
//         // Not authenticated? Push to login screen
//         if (!authenticated) {
//           this.router.navigateByUrl('/login');
//           return of(null);
//         }

//         // Favorite the article if it isn't favorited yet
//         if (!this.article.favorited) {
//           return this.articlesService.favorite(this.article.slug)
//           .pipe(tap(
//             data => {
//               this.isSubmitting = false;
//               this.toggle.emit(true);
//             },
//             err => this.isSubmitting = false
//           ));

//         // Otherwise, unfavorite the article
//         } else {
//           return this.articlesService.unfavorite(this.article.slug)
//           .pipe(tap(
//             data => {
//               this.isSubmitting = false;
//               this.toggle.emit(false);
//             },
//             err => this.isSubmitting = false
//           ));
//         }

//       }
//     )).subscribe();
//   }
// }
