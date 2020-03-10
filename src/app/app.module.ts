import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PageHomeComponent } from "./page-home/page-home.component";
import { PageAboutComponent } from "./page-about/page-about.component";
import { PageEventsComponent } from "./page-events/page-events.component";
import { PageGamesComponent } from "./page-games/page-games.component";
import { PageContactsComponent } from "./page-contacts/page-contacts.component";
import { PageNewsComponent } from "./page-news/page-news.component";
import { PageUsersComponent } from "./page-users/page-users.component";
import { PageLoginComponent } from "./page-login/page-login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LayoutBodyComponent } from './layout-body/layout-body.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageAboutComponent,
    PageEventsComponent,
    PageGamesComponent,
    PageContactsComponent,
    PageNewsComponent,
    PageUsersComponent,
    PageLoginComponent,
    PageNotFoundComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutBodyComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
