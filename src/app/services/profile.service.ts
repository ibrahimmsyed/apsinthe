import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

  param1;
  param2;

  //private url = 'http://10.98.20.102/trackR-master/index.php/'; 
  private url = 'http://10.98.101.142/apsinthe/trackR/index.php/';
  //private url = 'http://10.98.20.100/trackRR/index.php/';

  constructor(private http: HttpClient) { }
  
  getUser(usrToken, uId){
    this.param1=usrToken;
    this.param2=uId;
    return this.http.get(this.url+'userprofile?token=' + this.param1 + '&uid=' + this.param2)
    .map(data => {return data; });
  }

}
