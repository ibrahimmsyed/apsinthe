import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ProfileService } from '../../services/profile.service';
import { UserToken } from '../../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor( private router: Router,private authservice:AuthService,private alertservice : AlertService, private profileService: ProfileService) { }
  user_token: UserToken;
  items: any;

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    this.profileService.getUser(this.user_token.token, this.user_token.id).subscribe((data) => {this.items = data; console.log(data, this.user_token)});
  }

}
