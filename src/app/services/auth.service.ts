import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Headers,Response, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DatePipe } from '@angular/common';


import { UserToken, User } from '../model/User';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    
  userData : any;
  users: User[] = [];
  public user_token: UserToken;
  currenttime:number;

  private url = 'http://10.98.101.142/apsinthe/trackR/index.php/';
  //private url = 'http://10.98.20.100/trackRR/index.php/';
  
  constructor(private http: HttpClient,private alertservice : AlertService,private router: Router) { }
  login(username: string, password: string) { 
    return this.http.post<any>(this.url+'auth/login', { empid : username, password: password },{headers: new HttpHeaders().set('Content-Type', 'application/json')},)
        .map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token_id) {
                user.intime = Math.floor(Date.now() / 1000);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;

        });
        
  }
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  userAccessToken(){
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.currenttime = Math.floor(Date.now() / 1000);
    this.user_token = new UserToken;
    this.user_token.token = this.userData.token_id;
    this.user_token.id = this.userData.id;
    this.user_token.role = this.userData.user_role;
    this.user_token.intime = this.userData.intime;
    this.user_token.expiredtime = this.userData.intime + 30600;
    if(this.currenttime > this.user_token.expiredtime){
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        this.alertservice.error('Your login expired');
    }else{
        return this.user_token;
    }
  }
}