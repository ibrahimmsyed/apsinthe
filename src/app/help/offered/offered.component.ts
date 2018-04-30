import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '../../services/broadcast.service';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../model/User';

@Component({
  selector: 'app-offered',
  templateUrl: './offered.component.html',
  styleUrls: ['./offered.component.scss']
})
export class OfferedComponent implements OnInit {

  user_token: UserToken;
  receivedData : any;
  receiverData : any;
  sentUser = {};
  
  user : any;
  
  constructor(private braodcastService : BroadcastService, private authservice : AuthService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    
    this.braodcastService.getuserreceivedlist(this.user_token.token,this.user_token.id).subscribe((data) => {
      this.receivedData = data;
      
      this.findSendParty(this.receivedData);
     
    });

  }

  findSendParty(data){
    //console.log(data);
    for(let i = 0; i < data.length; i++){
      //console.log(data[i].SEND_PARTY);
      this.user = this.braodcastService.getuserdata(this.user_token.token,this.user_token.id,data[i].SEND_PARTY).subscribe((data) => {
        this.user = data;
        this.sentUser[i] = this.user[0].fname + ' ' + this.user[0].lname;
      });
    }
    console.log(this.sentUser);
  }

}
