import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
