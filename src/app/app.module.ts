import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { PageAboutComponent } from "./pages/page-about/page-about.component";
import { PageEventsComponent } from "./pages/page-events/page-events.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";
import { PageContactsComponent } from "./pages/page-contacts/page-contacts.component";
import { PageNewsComponent } from "./pages/page-news/page-news.component";
import { PageUsersComponent } from "./pages/page-users/page-users.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { LayoutHeaderComponent } from "./layout/layout-header/layout-header.component";
import { LayoutFooterComponent } from "./layout/layout-footer/layout-footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { CarouselComponent } from "./carousel/carousel.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./data.service";
import { LayoutContactsComponent } from "./layout/layout-contacts/layout-contacts.component";
import { LayoutTeamComponent } from "./layout/layout-team/layout-team.component";
import { LayoutFeaturesComponent } from "./layout/layout-features/layout-features.component";
import { LayoutEventsRuletteComponent } from "./layout/layout-events-rulette/layout-events-rulette.component";
import { HowItWorksComponent } from "./layout/how-it-works/how-it-works.component";
import { LayoutHeroComponent } from "./layout/layout-hero/layout-hero.component";
import { GameComponent } from "./game/game.component";
import { EventItemComponent } from "./event-item/event-item.component";
import { EventDetailInfoComponent } from "./event-detail-info/event-detail-info.component";
import { MapComponent } from "./map/map.component";
import { AgmCoreModule } from "@agm/core";
import { from } from "rxjs";
import { FilterCategoryComponent } from "./filter-category/filter-category.component";
import { EventsFilterPipe } from "./events-filter.pipe";
import { FormsModule } from "@angular/forms";
import { ParticipantsCountComponent } from "./participants-count/participants-count.component";

import { AddToFavoritesComponent } from "./add-to-favorites/add-to-favorites.component";
import { NgxPageScrollCoreModule } from "ngx-page-scroll-core";
import { NgxPageScrollModule } from "ngx-page-scroll";

import { GameDetailInfoComponent } from "./game-detail-info/game-detail-info.component";
import { TeamComponent } from "./about-layout/team/team.component";
import { AboutUsComponent } from "./about-layout/about-us/about-us.component";
import { AboutUsHeaderComponent } from "./about-layout/about-us-header/about-us-header.component";
import { PageCreateAccountComponent } from "./pages/page-create-account/page-create-account.component";
import { LayoutPartnersComponent } from "./layout/layout-partners/layout-partners.component";
import { PageAccountComponent } from "./pages/page-account/page-account.component";

import { GameCategoryIconsComponent } from "./game-category-icons/game-category-icons.component";

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
    CarouselComponent,
    LayoutContactsComponent,
    LayoutTeamComponent,
    LayoutFeaturesComponent,
    LayoutEventsRuletteComponent,
    HowItWorksComponent,
    LayoutHeroComponent,
    GameComponent,
    EventItemComponent,
    EventDetailInfoComponent,
    MapComponent,
    FilterCategoryComponent,
    EventsFilterPipe,
    ParticipantsCountComponent,
    AddToFavoritesComponent,
    GameDetailInfoComponent,
    TeamComponent,
    AboutUsComponent,
    AboutUsHeaderComponent,
    PageCreateAccountComponent,
    LayoutPartnersComponent,
    PageAccountComponent,
    GameCategoryIconsComponent
  ],
  imports: [
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBhhn-SgQJin5c_6vFZg6jTriwBxQYuoJg"
    }),
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
