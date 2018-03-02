import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

import { User } from '../../model/User';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  users: User[] = [];
  token:string;
  returnUrl: string;
  public perm = [];
  redirectUrl : string;

  constructor(
    private authservice:AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertservice : AlertService,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    // reset login status
    this.authservice.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    console.log(this.user);
    //this.authservice.get();
    this.authservice.login(this.user.username, this.user.password)
    .subscribe(
        data => {
          console.log('success');
          console.log(data);
          if(data.token_id){
            console.log(data.user_role);
            
            this.token = data.token;
            this.alertservice.success(data.message);
            if(data.user_role == 0){
              this.redirectUrl = "user-profile/profile";
              this.perm = ["ADMIN"];
              this.permission(this.perm,this.redirectUrl);
            }else if(data.user_role == 1){
              this.redirectUrl = "user-profile/calendar";
              this.perm = ["MEDIATOR"];
              this.permission(this.perm,this.redirectUrl);
            }else if(data.user_role == 2){
              this.redirectUrl = "user-profile/calendar";
              this.perm = ["USER"];
              this.permission(this.perm,this.redirectUrl);
            }
            /* this.permissionsService.loadPermissions(this.perm);
            this.router.navigateByUrl('user-profile/profile'); */
          }else{
            this.alertservice.error(data.message);
          }
            
        },
        error => {
          console.log('fail');
            this.alertservice.error(error);
            //this.loading = false;
            
        });
  }

  permission(permission,redirectTo){
    this.permissionsService.loadPermissions(permission);
    this.router.navigateByUrl(redirectTo);
  }
}
