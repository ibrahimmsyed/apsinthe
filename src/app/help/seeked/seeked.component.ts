import { Component, OnInit } from '@angular/core';
import { UserToken } from '../../model/User';
import { AuthService } from '../../services/auth.service';
import { BroadcastService } from '../../services/broadcast.service';
import { AlertService } from '../../services/alert.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-seeked',
  templateUrl: './seeked.component.html',
  styleUrls: ['./seeked.component.scss']
})
export class SeekedComponent implements OnInit {

  user_token: UserToken;
  acceptedMessage:string;
  accpetedName:string;
  broadcastData:any;
  userData:any;
  
  user : any;
  sentData : any;
  acceptedUser = {};
  pusheditems = {};
  olditems = {};
  userAccepted = {};
  
  constructor(private authservice: AuthService, private braodcastService : BroadcastService, private alertservice: AlertService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    this.sentBroadcast();


    this.braodcastService.getuserbroadcastlist(this.user_token.token,this.user_token.id).subscribe((data) => {
      this.sentData = data;
      
      this.findSendParty(this.sentData);
     
    });
  }
  ngAfterViewInit() {
    this.getsentBroadcast();
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
            console.log('equal');
          }else{
            console.log('not equal');
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
      console.log(data[0]);
      if(data[0].RECEIVE_PARTY){
        this.braodcastService.getuserdata(this.user_token.token, this.user_token.id,  data[0].RECEIVE_PARTY).subscribe((user) => {
            console.log(user)
            this.userData = user;
            this.accpetedName = this.userData[0].fname + ' ' + this.userData[0].lname;
            
            this.acceptedMessage = "Your Request "+data[0].TITLE+" has been accpeted by "+ this.accpetedName;
            this.alertservice.success(this.acceptedMessage);    
        });
      }
    });
  }

  findSendParty(data){
    //console.log(data);
    for(let i = 0; i < data.length; i++){
      //console.log(data[i].SEND_PARTY);
      if(data[i].RECEIVE_PARTY){
        this.user = this.braodcastService.getuserdata(this.user_token.token,this.user_token.id,data[i].RECEIVE_PARTY).subscribe((data) => {
          this.user = data;
          this.acceptedUser[i] = this.user[0].fname + ' ' + this.user[0].lname;
        });
      }else{
        this.acceptedUser[i] = 'N/A';
      }
    }
    console.log(this.acceptedUser);
  }

}
