import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {Location} from '@angular/common';

import { BroadcastService } from '../../services/broadcast.service';
import { UserToken } from '../../model/User';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-seekdetail',
  templateUrl: './seekdetail.component.html',
  styleUrls: ['./seekdetail.component.scss']
})
export class SeekdetailComponent implements OnInit {

  title:string;
  message:string;
  name:string;
  user_token: UserToken;
  braodcastData : any;
  selectedId : any;
  senderId : number;
  userData : any;
  senderName : any;

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private broadcastservice : BroadcastService, private authService : AuthService, private profileService : ProfileService) {
   
   }

  ngOnInit() {
      //this.route.snapshot.paramMap.get('id');
      this.user_token = new UserToken;
      this.user_token = this.authService.userAccessToken();

      this.route.params.subscribe(params => {
        this.broadcastservice.getbroadcast(this.user_token.token, this.user_token.id,  params.bid).subscribe((data) => {
          this.braodcastData = data[0];
          this.title = this.braodcastData.TITLE;
          this.message = this.braodcastData.MESSAGE;
          this.getsendername(this.braodcastData.SEND_PARTY);
        });
       

      


      });
  }
  getsendername(id){
    //console.log(id);
    this.broadcastservice.getuserdata(this.user_token.token, this.user_token.id,  id).subscribe((data) => {
      this.userData = data;
      this.senderName = this.userData[0].fname + ' ' + this.userData[0].lname;
      
      //console.log(this.userData[0]);
    });
  }

  accept(){
    this.broadcastservice.acceptbroadcast(this.user_token.token, this.user_token.id,  this.braodcastData.BROAD_ID).subscribe((data) => {
      //console.log(data);
      this._location.back();
    });
    
  }

  

}
