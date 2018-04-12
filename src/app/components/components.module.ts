import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from '../help/notification/notification.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent
],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent

  ]
})
export class ComponentsModule { }
