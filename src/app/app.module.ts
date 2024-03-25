import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent} from './components/home/home.component'
import {CarouselModule} from 'ngx-owl-carousel-o';
import { PrevDirective } from './directives/prev.directive';
import { NextDirective } from './directives/next.directive';
import { ToggleSignOutDirective } from './directives/toggle-sign-out.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZoomImageDirective } from './directives/zoom-image.directive';
import { InfoDetailMotelComponent } from './components/info-detail-motel/info-detail-motel.component';
import { LoginComponent } from './components/login/login.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/managers/admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { UsersComponent } from './components/managers/users/users.component';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import{CurrencyPipe} from '@angular/common';
import { MotelsComponent } from './components/managers/motels/motels.component';
import { AddMotelComponent } from './components/managers/add-motel/add-motel.component';
import { UpdateMotelComponent } from './components/managers/update-motel/update-motel.component';
import { ToggleFilterDirective } from './directives/toggle-filter.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PrevDirective,
    NextDirective,
    ZoomImageDirective,
    ToggleSignOutDirective,
    InfoDetailMotelComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    MotelsComponent,
    AddMotelComponent,
    UpdateMotelComponent,
    ToggleFilterDirective,
    SearchFilterPipe,


    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    CarouselModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    NgxPaginationModule
    
  
  ],
  providers: [
    DecimalPipe,
    CurrencyPipe,
    AuthService,
    AuthInterceptor,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
