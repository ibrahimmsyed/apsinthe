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
  broadcastData:any;
  userData:any;
  sentData : any;
  acceptedMessage:string;
  accpetedName:string;
  acceptedUser = {};
  pusheditems = {};
  olditems = {};


  constructor(private authservice: AuthService, private braodcastService : BroadcastService, private alertservice: AlertService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    this.checkingBroadcast();
    this.sentBroadcast();
  }

  ngAfterViewInit() {
    this.checkForBroadcast();
    this.getsentBroadcast();    
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

  
  sentBroadcast(){
    IntervalObservable.create(10000).subscribe(() => {
      this.getsentBroadcast();
    });
  }
  getsentBroadcast(){
    this.braodcastService.getuserbroadcastlist(this.user_token.token,this.user_token.id).subscribe((data) => {
      this.broadcastData = data;

      for(let i of data){
        this.pusheditems[i.BROAD_ID] = i.BROAD_STATUS;
      }
      
    
      if(this.isEmptyObject(this.olditems))
      {
        //console.log("brand is empty")
      }else{
        for(let j in this.pusheditems){
          if(this.pusheditems[j] == this.olditems[j]){
           // console.log('equal');
          }else{
          //  console.log('not equal');
            this.alertAccepted(j);
          }
        }
      }
      
      //console.log(this.olditems);
      this.olditems = this.pusheditems;
      this.pusheditems = {};
      
    });
  }
  isEmptyObject(obj) {
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
    }

    return true;
  }
  alertAccepted(bid){
    this.braodcastService.getbroadcast(this.user_token.token,this.user_token.id,bid).subscribe((data) => { 
      //console.log(data[0]);
      if(data[0].RECEIVE_PARTY){
        this.braodcastService.getuserdata(this.user_token.token, this.user_token.id,  data[0].RECEIVE_PARTY).subscribe((user) => {
           // console.log(user)
            this.userData = user;
            this.accpetedName = this.userData[0].fname + ' ' + this.userData[0].lname;
            
            this.acceptedMessage = "Your Request "+data[0].TITLE+" has been accpeted by "+ this.accpetedName;
            this.alertservice.success(this.acceptedMessage);    
        });
      }
    });
  }
  
  

}
