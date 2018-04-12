import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { LoginComponent } from './user-access/login/login.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { CalendarComponent } from './user-profile/calendar/calendar.component';
import { PagenotfoundComponent } from './page404/pagenotfound/pagenotfound.component';
import { MainComponent } from './main/main.component';
import { SeekComponent } from './help/seek/seek.component';
import { SeekdetailComponent } from './help/seekdetail/seekdetail.component';
import { SeekedComponent } from './help/seeked/seeked.component';
import { OfferedComponent } from './help/offered/offered.component';

const appRoutes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: '', component: MainComponent, children:[{path : 'profile',component: ProfileComponent}], canActivate: [AuthGuard]},
    { path: '', component: MainComponent, children:[{path : 'calendar',component: CalendarComponent}], canActivate: [AuthGuard]},

    { path: '', component: MainComponent, children:[{path : 'seek',component: SeekComponent}], canActivate: [AuthGuard]},
    { path: '', component: MainComponent, children:[{path : 'seeked',component: SeekedComponent}], canActivate: [AuthGuard]},
    { path: '', component: MainComponent, children:[{path : 'offered',component: OfferedComponent}], canActivate: [AuthGuard]},
    { path: '', component: MainComponent, children:[{path : 'seekdetail/:bid/:id',component: SeekdetailComponent}], canActivate: [AuthGuard]},
    
    { path: 'dashboard', component: MainComponent, children:[{path : 'development',component: CalendarComponent}], canActivate: [AuthGuard,NgxPermissionsGuard],data: {permissions: {only: 'ADMIN'}}},
    { path: 'dashboard', component: MainComponent, children:[{path : 'qa',component: CalendarComponent}], canActivate: [AuthGuard,NgxPermissionsGuard],data: {permissions: {only: 'ADMIN'}}},
    { path: 'dashboard', component: MainComponent, children:[{path : 'ad-op',component: CalendarComponent}], canActivate: [AuthGuard,NgxPermissionsGuard],data: {permissions: {only: 'ADMIN'}}},
    { path: '**', component: PagenotfoundComponent}
];
export const routing = RouterModule.forRoot(appRoutes);