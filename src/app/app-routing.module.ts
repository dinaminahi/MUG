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
import { UserEditFormComponent } from "./user-edit-form/user-edit-form.component";
import { AddGameFormComponent } from "./add-game-form/add-game-form.component";
// -------------------------not used for  now
// import { PageAccountComponent } from "./pages/page-account/page-account.component";
// import { PageContactsComponent } from "./pages/page-contacts/page-contacts.component";
// import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageUserAccountComponent } from "./pages/page-user-account/page-user-account.component";
// -------------------------
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AuthGuard } from "./shared/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  // ------login----
  // { path: "sign-in", component: SigninComponent },
  // { path: "sign-up", component: SignupComponent },
  {
    path: "user-profile/:id",
    component: UserProfileComponent,
    canActivate: [AuthGuard], // - check if loggedin or not
  },
  {
    path: "useraccount/:id",
    component: PageUserAccountComponent,
    canActivate: [AuthGuard], // - check if loggedin or not
  },
  // -------login----
  //-----user
  {
    path: "user-edit/:id",
    component: UserEditFormComponent,
    canActivate: [AuthGuard], // - check if loggedin or not
  },
  //----
  { path: "home", component: PageHomeComponent },
  { path: "about", component: PageAboutComponent },
  {
    path: "events",
    component: PageEventsComponent,
  },
  { path: "events/:id", component: EventDetailInfoComponent },
  {
    path: "pageaddevent",
    component: PageAddEventComponent,
    canActivate: [AuthGuard], // - check if loggedin or not
  },
  { path: "games", component: PageGamesComponent },
  { path: "games/:id", component: GameDetailInfoComponent },
  {
    path: "addgame",
    component: AddGameFormComponent,
    canActivate: [AuthGuard], // - check if loggedin or not
  },
  // { path: "account", component: PageAccountComponent },
  // { path: "login", component: PageLoginComponent },
  // { path: "signin", component: PageUserAccountComponent },
  // { path: "contacts", component: PageContactsComponent },

  { path: "news", component: PageNewsComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
