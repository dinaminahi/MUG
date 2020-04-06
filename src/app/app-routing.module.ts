import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageAboutComponent } from "./pages/page-about/page-about.component";
// import { PageContactsComponent } from "./pages/page-contacts/page-contacts.component";
import { PageEventsComponent } from "./pages/page-events/page-events.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";
import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageNewsComponent } from "./pages/page-news/page-news.component";
import { PageUsersComponent } from "./pages/page-users/page-users.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { EventDetailInfoComponent } from "./event-detail-info/event-detail-info.component";
import { PageAddEventComponent } from "./pages/page-add-event/page-add-event.component";
import { GameDetailInfoComponent } from "./game-detail-info/game-detail-info.component";
import { PageCreateAccountComponent } from "./pages/page-create-account/page-create-account.component";
import { PageAccountComponent } from "./pages/page-account/page-account.component";
import { AuthGuard } from "./auth/auth.guard";

import { CallbackComponent } from "./callback/callback.component";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "special", // maby 'account'
    component: PageAccountComponent,
    // Add this to guard this route
    canActivate: [AuthGuard],
  },
  {
    path: "callback",
    component: CallbackComponent,
    // Add this to guard this route
    canActivate: [AuthGuard],
  },
  { path: "about", component: PageAboutComponent },
  { path: "account", component: PageAccountComponent },
  // { path: "contacts", component: PageContactsComponent },
  { path: "events", component: PageEventsComponent },
  { path: "events/:id", component: EventDetailInfoComponent },
  { path: "addevent", component: PageAddEventComponent },
  { path: "games", component: PageGamesComponent },
  { path: "games/:id", component: GameDetailInfoComponent },
  { path: "home", component: PageHomeComponent },
  { path: "login", component: PageLoginComponent },
  { path: "signin", component: PageCreateAccountComponent },
  { path: "news", component: PageNewsComponent },
  { path: "users", component: PageUsersComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
