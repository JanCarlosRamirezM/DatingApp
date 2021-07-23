import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { TabsModule } from "ngx-bootstrap/tabs";

import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";

import { ErrorInterceptorProvider } from "./interceptor/error.service";
import { ListsComponent } from "./components/lists/lists.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { appRoutes } from "./routes";
import { AuthGuard } from "./guards/auth.guard";
import { MemberListComponent } from "./components/member/member-list/member-list.component";
import { MemberDetailComponent } from "./components/member/member-detail/member-detail.component";
import { MemberCardComponent } from "./components/member/member-card/member-card.component";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberDetailComponent,
    MemberCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: ["localhost:5000/api/auth"],
      },
    }),
  ],
  providers: [ErrorInterceptorProvider, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
