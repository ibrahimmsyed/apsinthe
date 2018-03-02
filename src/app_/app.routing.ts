import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { IconsComponent } from './icons/icons.component';

import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { LoginComponent } from './user-access/login/login.component';
/* import { MyProfileComponent } from './user-profile/my-profile/my-profile.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { CalendarComponent } from './user-profile/calendar/calendar.component'; */
import { PagenotfoundComponent } from './page404/pagenotfound/pagenotfound.component';


const routes: Routes =[
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'icons',          component: IconsComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
