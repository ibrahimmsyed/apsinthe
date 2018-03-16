import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

  param1;
  param2;

  constructor(private http: HttpClient) { }
  
  getUser(usrToken, uId){
    this.param1=usrToken;
    this.param2=uId;
    return this.http.get('http://10.98.101.142/apsinthe/trackR/index.php/userprofile?token=' + this.param1 + '&uid=' + this.param2)
    .map(data => { return data; });
  }

}