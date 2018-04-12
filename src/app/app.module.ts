import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { UserAccessModule } from './user-access/user-access.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './user-access/login/login.component';

import { LoginGuard } from './services/login.guard';
import { PagenotfoundComponent } from './page404/pagenotfound/pagenotfound.component';
import { AlertComponent } from './alert/alert/alert.component';
import { AlertService } from './services/alert.service';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from './components/components.module';
import { ProfileService } from './services/profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BroadcastService } from './services/broadcast.service';
import { HelpModule } from './help/help.module';
import { SeekComponent } from './help/seek/seek.component';






@NgModule({
  declarations: [
    AppComponent,LoginComponent, PagenotfoundComponent, AlertComponent, MainComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UserAccessModule,
    UserProfileModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    HelpModule,
    ReactiveFormsModule,
    // Specify your library as an import
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    AlertService,
    ProfileService,
    BroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
