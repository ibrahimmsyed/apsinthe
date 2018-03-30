import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
    
    { path: '', title: 'Profile',  icon:'content_paste', 'link': false, class: '', submenu : [{ path: 'profile', title: 'Profile',  icon:'bubble_chart', class: '','link': true, },{ path: 'calendar', title: 'Calendar',  icon:'notifications', class: '','link': true, }] },
    { path: '', title: 'Task',  icon:'content_paste', 'link': false, class: '', submenu : [{ path: 'create', title: 'Create',  icon:'bubble_chart', class: '','link': true, },{ path: 'list', title: 'List',  icon:'notifications', class: '','link': true, },{ path: 'completed', title: 'Completed',  icon:'notifications', class: '','link': true, }] },
    { path: '', title: 'Report',  icon:'content_paste', 'link': false, class: '', submenu : [{ path: 'productivity', title: 'Productivity',  icon:'bubble_chart', class: '','link': true, },{ path: 'quality', title: 'Utilisation',  icon:'notifications', class: '','link': true, }] },
    
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
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  user_token: UserToken;
  index:number;
  something:string;
  i:number;

  constructor(private authService : AuthService) { }
  @ViewChild('patientDDL') patientDDL:ElementRef;
  @ViewChildren('patientDDL') childComponents: QueryList<ElementRef>;
  ngOnInit() {

    
    this.user_token = new UserToken;
    this.user_token = this.authService.userAccessToken();
   
    if(this.user_token.role === 0){
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }else if(this.user_token.role === 1){
        this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    }else if(this.user_token.role === 2){
        this.menuItems = ADMINROUTES.filter(menuItem => menuItem);
    }


  }
  ngAfterViewInit() {
    setTimeout(()=>{   
        //console.log(this.patientDDL);
        //console.log(this.childComponents.toArray().length);
        for(var i=0;i<this.childComponents.toArray().length;i++){
            if(this.childComponents.toArray()[i].nativeElement.classList.contains('active')){
                //console.log(this.childComponents.toArray()[i].nativeElement.classList);
                this.index = this.childComponents.toArray()[i].nativeElement.classList[0];
            }
        }
        //console.log(this.patientDDL.nativeElement.classList.contains('active'));
        //console.log(this.patientDDL.nativeElement.classList);
        /* if(this.patientDDL.nativeElement.classList.contains('active')) {
            console.log(this.patientDDL.nativeElement.classList);
            this.index = this.patientDDL.nativeElement.classList[0];
          } */
   },500);

  }



  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  toggleMenu(i) {
    this.index = i;
    
  }
}
