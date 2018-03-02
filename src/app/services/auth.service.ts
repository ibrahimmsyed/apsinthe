import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Headers,Response, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserToken, User } from '../model/User';

@Injectable()
export class AuthService {

  userData : any;
  users: User[] = [];
  public user_token: UserToken;
  
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post<any>('http://10.98.101.142/apsinthe/trackR/index.php/auth/login', { empid : username, password: password },{headers: new HttpHeaders().set('Content-Type', 'application/json')},)
        .map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token_id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                console.log(user);
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
    console.log(this.userData);
    console.log(this.userData.token_id);
    
    this.user_token = new UserToken;
    this.user_token.token = this.userData.token_id;
    this.user_token.id = this.userData.id;
    return this.user_token;
  }
}
