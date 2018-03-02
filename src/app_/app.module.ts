import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { IconsComponent } from './icons/icons.component';

import { UserAccessModule } from './user-access/user-access.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
/* import { UserProfileModule } from './user-profile/user-profile.module'; */
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user-access/login/login.component';

import { LoginGuard } from './services/login.guard';
import { PagenotfoundComponent } from './page404/pagenotfound/pagenotfound.component';
import { AlertComponent } from './alert/alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    AppComponent,
    LoginComponent, 
    PagenotfoundComponent, 
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    UserAccessModule,
    FormsModule,
    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }