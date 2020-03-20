import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageAboutComponent } from "./pages/page-about/page-about.component";
import { PageContactsComponent } from "./pages/page-contacts/page-contacts.component";
import { PageEventsComponent } from "./pages/page-events/page-events.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";
import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageNewsComponent } from "./pages/page-news/page-news.component";
import { PageUsersComponent } from "./pages/page-users/page-users.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { EventDetailInfoComponent } from "./event-detail-info/event-detail-info.component";

export const routes: Routes = [
  { path: "about", component: PageAboutComponent },
  { path: "contacts", component: PageContactsComponent },
  { path: "events", component: PageEventsComponent },
  { path: "events/:id", component: EventDetailInfoComponent },
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
