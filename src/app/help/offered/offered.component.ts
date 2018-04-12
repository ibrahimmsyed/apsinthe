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

  constructor(private braodcastService : BroadcastService, private authservice : AuthService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    
    this.braodcastService.getuserreceivedlist(this.user_token.token,this.user_token.id).subscribe((data) => {
      console.log(data);
      this.receivedData = data;
    });

  }

}
