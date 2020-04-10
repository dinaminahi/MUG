import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageAboutComponent } from "./pages/page-about/page-about.component";
import { PageEventsComponent } from "./pages/page-events/page-events.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";
import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { PageNewsComponent } from "./pages/page-news/page-news.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { EventDetailInfoComponent } from "./event-detail-info/event-detail-info.component";
import { PageAddEventComponent } from "./pages/page-add-event/page-add-event.component";
import { GameDetailInfoComponent } from "./game-detail-info/game-detail-info.component";
import { PageAccountComponent } from "./pages/page-account/page-account.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AuthGuard } from "./shared/auth.guard";
// import { PageCreateAccountComponent } from "./pages/page-create-account/page-create-account.component";
// import { PageUsersComponent } from "./pages/page-users/page-users.component";
// import { PageContactsComponent } from "./pages/page-contacts/page-contacts.component";

export const routes: Routes = [
  // {
  //   path: "userprofile/:id",
  //   component: UserProfileComponent,
  //   canActivate: [AuthGuard],
  // },
  { path: "about", component: PageAboutComponent },
  { path: "events", component: PageEventsComponent },
  { path: "events/:id", component: EventDetailInfoComponent },
  { path: "addevent", component: PageAddEventComponent },
  { path: "games", component: PageGamesComponent },
  { path: "games/:id", component: GameDetailInfoComponent },
  { path: "home", component: PageHomeComponent },
  { path: "login", component: SigninComponent }, // changed
  { path: "register", component: SignupComponent }, //changed
  { path: "news", component: PageNewsComponent },
  { path: "userprofile", component: UserProfileComponent }, // changed
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
  // { path: "account", component: PageAccountComponent },
  // { path: "contacts", component: PageContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
