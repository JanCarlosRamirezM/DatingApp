import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";

import { ErrorInterceptorProvider } from "./interceptor/error.service";
import { ListsComponent } from "./components/lists/lists.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { appRoutes } from "./routes";
import { AuthGuard } from "./guards/auth.guard";
import { MemberListComponent } from "./components/member-list/member-list.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ErrorInterceptorProvider, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
