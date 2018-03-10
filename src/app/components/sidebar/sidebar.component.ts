import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserToken, User } from '../../model/User';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    link: boolean;
    submenu: any;
}
export const ROUTES: RouteInfo[] = [
    { path: 'calendar', title: 'Calendar',  icon: 'event_note', class: '', 'link': true, submenu : '' },
    { path: 'profile', title: 'User Profile',  icon:'person', class: '', 'link': true, submenu : '' },
    { path: 'javascript:void();', title: 'Task',  icon:'content_paste', 'link': false, class: '', submenu : [{ path: 'task/create', title: 'Create',  icon:'bubble_chart', class: '','link': true,}] },
    
 /*   { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' }, */
];

export const ADMINROUTES: RouteInfo[] = [
    { path: 'development', title: 'Development',  icon: 'event_note', class: '','link': true, submenu : '' },
    { path: 'qa', title: 'Quality Assurance',  icon:'person', class: '','link': true,submenu : '' },
    { path: 'ad-ops', title: 'Ad Operations',  icon:'content_paste', class: '' ,'link': true, submenu : ''},
/*  { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' }, */
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user_token: UserToken;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authService.userAccessToken();
    console.log(this.user_token.role);
    if(this.user_token.role === 0){
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }else if(this.user_token.role === 1){
        this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    }else if(this.user_token.role === 2){
        this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
