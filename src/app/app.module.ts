import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { TaskModule } from './task/task.module';
import { TaskService } from './services/task.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { TaskPipeModule } from './pipes/task-pipe.module';
import { ReportsModule } from './reports/reports.module';
import { GetDataService } from './services/get-data.service';
import { UniqueDataService } from './services/unique-data.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,LoginComponent, PagenotfoundComponent, AlertComponent, MainComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UserAccessModule,
    UserProfileModule,
    ComponentsModule,
    TaskModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    HelpModule,
    ReportsModule,
    ReactiveFormsModule,
    // Specify your library as an import
    NgxPermissionsModule.forRoot(),
    NgbModule.forRoot(),
    TaskPipeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    AlertService,
    ProfileService,
    BroadcastService,
    TaskService,
    GetDataService,
    UniqueDataService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
