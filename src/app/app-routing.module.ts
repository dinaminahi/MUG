import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageAboutComponent } from "./page-about/page-about.component";
import { PageContactsComponent } from "./page-contacts/page-contacts.component";
import { PageEventsComponent } from "./page-events/page-events.component";
import { PageGamesComponent } from "./page-games/page-games.component";
import { PageHomeComponent } from "./page-home/page-home.component";
import { PageLoginComponent } from "./page-login/page-login.component";
import { PageNewsComponent } from "./page-news/page-news.component";
import { PageUsersComponent } from "./page-users/page-users.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: "about", component: PageAboutComponent },
  { path: "contacts", component: PageContactsComponent },
  { path: "events", component: PageEventsComponent },
  { path: "games", component: PageGamesComponent },
  { path: "home", component: PageHomeComponent },
  { path: "login", component: PageLoginComponent },
  { path: "news", component: PageNewsComponent },
  { path: "users", component: PageUsersComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
