import { Component, OnInit } from '@angular/core';
import { UserToken } from '../../model/User';
import { AuthService } from '../../services/auth.service';
import { BroadcastService } from '../../services/broadcast.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  user_token: UserToken;
  toggleValue : boolean;
  notificationData : any;
  totalNotification : number;

  userData:any;


  constructor(private authservice: AuthService, private braodcastService : BroadcastService, private alertservice: AlertService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    this.checkingBroadcast();
    
  }

  ngAfterViewInit() {
    this.checkForBroadcast();
    
  }
  
  checkForBroadcast(){
    IntervalObservable.create(5000).subscribe(() => {
      this.checkingBroadcast();
    }); 
  }

  
  checkingBroadcast(){
    //console.log(this.user_token.id);
    this.braodcastService.get(this.user_token.token,this.user_token.id).subscribe((data) => {this.notificationData = data;this.totalNotification = this.notificationData.length;});
  }

  toggleNotification(){
    this.toggleValue = this.toggleValue ? false : true ;
  }

  
  
  

}
