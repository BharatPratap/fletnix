import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserViewComponent } from './pages/user/user.component';
import { FormsModule }   from '@angular/forms';

import { httpInterceptorProviders } from './_helper/http.interceptor';
import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { BrowseComponent } from './pages/browse/browse.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserViewComponent,
    SearchComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HeaderComponent,
    BrowseComponent,
    CommonModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
