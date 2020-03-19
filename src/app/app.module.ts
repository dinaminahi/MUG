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
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { LayoutContactsComponent } from './layout/layout-contacts/layout-contacts.component';
import { LayoutTeamComponent } from './layout/layout-team/layout-team.component';

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
    LayoutTeamComponent
  ],
  imports: [
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
    MDBBootstrapModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
